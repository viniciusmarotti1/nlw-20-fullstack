import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { createRoomsRoute } from './http/routes/create-room.ts';
import { getRoomQuestionRoute } from './http/routes/get-room-question.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomQuestionRoute);
app.register(createQuestionRoute);

app.get('/health', () => {
  return 'Ok';
});

app.listen({ port: env.PORT });
