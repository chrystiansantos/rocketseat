import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermission } from "@/utils/get-user-permissions";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { BadRequestError } from "../_errors/bad-request-errors";
import { UnauthorizedError } from "../_errors/unauthorized-error";

export async function revokeInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete('/organizations/:slug/invites/:inviteId', {
      schema: {
        tags: ['invites'],
        summary: 'Revoke an invite',
        security: [{ bearerAuth: [] }],
        params: z.object({
          slug: z.string(),
          inviteId: z.string()
        }),
        response: {
          204: z.null()
        }
      }
    }, async (request, reply) => {
      const { slug, inviteId } = request.params
      const userId = await request.getCurrentUserId()
      const { organization, membership } = await request.getUserMembership(slug)

      const { cannot } = getUserPermission(userId, membership.role)

      if (cannot('delete', 'Invite')) {
        throw new UnauthorizedError(`You're not allowed to delete an invites.`)
      }
      console.log(1)
      const invite = await prisma.invite.findUnique({
        where: {
          id: inviteId
        }
      })
      console.log(invite,'invite')
      if (!invite) {
        throw new BadRequestError('Invite not found')
      }
      console.log('DELETE')
      await prisma.invite.delete({
        where: {
          id: inviteId,
          organizationId: organization.id
        }
      })

      console.log('Finished')

      return reply.status(204).send()
    })
}