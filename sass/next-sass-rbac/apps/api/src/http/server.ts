import fastifyCors from "@fastify/cors";
import fastifyJWT from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { env } from "@saas/env";
import { errorhandler } from "./error-handler";
import { authenticationWithGithub } from "./routes/auth/authenticated-with-github";
import { authenticationWithPassword } from "./routes/auth/authenticated-with-password";
import { createAccount } from './routes/auth/create-account';
import { getProfile } from "./routes/auth/get-profile";
import { requestPasswordRecovery } from "./routes/auth/request-password-recovery";
import { resetPassword } from "./routes/auth/reset-password";
import { createOrganization } from "./routes/orgs/create-organization";
import { getMembership } from "./routes/orgs/get-membership";
import { getOrganization } from "./routes/orgs/get-organization";
import { getOrganizations } from "./routes/orgs/get-organizations";
import { shutdownOrganization } from "./routes/orgs/shutdown-organization";
import { transferOrganization } from "./routes/orgs/transfer-organization";
import { updateOrganization } from "./routes/orgs/update-organization";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorhandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js Saas',
      description: 'Full-stack SaaS app with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticationWithPassword)
app.register(getProfile)
app.register(requestPasswordRecovery)
app.register(resetPassword)
app.register(authenticationWithGithub)
app.register(createOrganization)
app.register(getMembership)
app.register(getOrganizations)
app.register(getOrganization)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running! 🚀')
})
