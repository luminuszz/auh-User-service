import fastify, { FastifyInstance } from 'fastify';
import { routes } from './routes';
import { UsersRoutes } from './routes/users.route';
import { connectionDb } from './database/connection';

export async function start(server: FastifyInstance) {
	try {
		server.register(connectionDb);
		server.register(routes);
		server.register(UsersRoutes);

		server.get('/', async (_, res) => {
			return res.send({
				message: 'server is workig',
			});
		});

		await server.listen(process.env.PORT || 3000, '0.0.0.0');
	} catch (error) {
		server.log.error(error);
	}
}
