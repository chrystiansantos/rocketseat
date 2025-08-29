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

import { errorhandler } from "./error-handler";
import { authenticationWithPassword } from "./routes/auth/authenticated-with-password";
import { createAccount } from './routes/auth/create-account';
import { getProfile } from "./routes/auth/get-profile";

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
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJWT, {
  secret: 'my-jwt-secret',
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticationWithPassword)
app.register(getProfile)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running! 🚀')
})
