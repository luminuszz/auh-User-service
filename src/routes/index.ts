import * as fastify from 'fastify';
import mongodb from 'mongodb';

interface UseRequest {
	name: string;
	email: string;
}

type User = {
	name: string;
	email: string;
};

export async function routes(server: fastify.FastifyInstance) {
	const usersCollection = server.mongo.db?.collection(
		'users'
	) as mongodb.Collection<User>;

	const userSchema: fastify.RouteShorthandOptions = {
		schema: {
			body: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					email: { type: 'string' },
				},
			},
		},
	};

	server.post<{ Body: UseRequest }>('/users', userSchema, async (manager) => {
		const { email, name } = manager.body;

		await usersCollection.insertOne({
			email,
			name,
		});

		return {
			ok: true,
		};
	});
}
