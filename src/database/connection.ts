import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyMongoDB from "fastify-mongodb";

async function createConnection(server: FastifyInstance) {
    server.register(fastifyMongoDB, {
        url: process.env.MONGO_URL_CONNECT,
        database: "auth_db",
    });
}

export const connectionDb = fastifyPlugin(createConnection);
