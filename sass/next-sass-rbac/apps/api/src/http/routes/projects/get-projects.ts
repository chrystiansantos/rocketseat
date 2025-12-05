import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { getUserPermission } from "@/utils/get-user-permissions";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UnauthorizedError } from "../_errors/unauthorized-error";

export async function getProjects(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['projects'],
          summary: 'Get all organization projects',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string()
          }),
          response: {
            200: z.object({
              projects: z.array(
                z.object({
                  name: z.string(),
                  id: z.uuid(),
                  slug: z.string(),
                  avatarUrl: z.string().nullable(),
                  ownerId: z.uuid(),
                  organizationId: z.uuid(),
                  description: z.string(),
                  createdAt: z.date(),
                  owner: z.object({
                    name: z.string().nullable(),
                    id: z.uuid(),
                    avatarUrl: z.string().nullable(),
                  })
                })
              )
            })
          }
        }
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermission(userId, membership.role)

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError(`You're not allowed to see organization projects.`)
        }

        const projects = await prisma.project.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            ownerId: true,
            description: true,
            avatarUrl: true,
            organizationId: true,
            createdAt: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              }
            }
          },
          where: {
            organizationId: organization.id
          },
          orderBy: {
            createdAt: 'desc',
          }

        })

        return reply.send({ projects })
      })
}