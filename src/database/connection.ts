import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyMongoDB from 'fastify-mongodb';

async function createConnection(server: FastifyInstance) {
	server.register(fastifyMongoDB, {
		url: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
		database: 'auth_db',
	});
}

export const connectionDb = fastifyPlugin(createConnection);
