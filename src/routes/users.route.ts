import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Collection, ObjectID } from 'mongodb';
import { jwtAuthService } from '../services/jwtAuthService';
import { hash, compare } from 'bcrypt';

type AuthUser = {
	_id: ObjectID;
	name: string;
	email: string;
	password: string;
	token?: string;
};

type AuthUserRequest = Omit<AuthUser, 'token' | 'id'>;

type AuthUserLogin = Pick<AuthUser, 'email' | 'password'>;

export async function UsersRoutes(server: FastifyInstance) {
	const AuthUsersCollection = server.mongo.db?.collection(
		'AuthUsersCollection'
	) as Collection<AuthUser>;

	const authUsersPostSchema: RouteShorthandOptions = {
		schema: {
			body: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					email: { type: 'string' },
					password: { type: 'string' },
				},
			},
		},
	};

	server.post('/authUsers', authUsersPostSchema, async (req, res) => {
		const { email, name, password } = req.body as AuthUserRequest;

		const query = { email };

		const verifyExistsUser = await AuthUsersCollection.findOne(query);

		if (verifyExistsUser) {
			res.status(400).send({
				message: 'User already exits!',
			});
		}

		const createdPasswordHash = await hash(password, 8);

		await AuthUsersCollection.insertOne({
			email,
			name,
			password: createdPasswordHash,
		});
	});

	const validateLoginUserRequestSchema: RouteShorthandOptions = {
		schema: {
			body: {
				type: 'object',
				properties: {
					email: { type: 'string' },
					password: { type: 'string' },
				},
			},

			response: {
				user: {
					type: 'object',
					properties: {
						email: { type: 'string' },
						name: { type: 'string' },
					},
				},

				token: { type: 'string' },
			},
		},
	};

	server.post(
		'/authUsers/login',
		validateLoginUserRequestSchema,
		async (req, res) => {
			const { email, password } = req.body as AuthUserLogin;

			const query = { email };

			const verifyExistsUser = await AuthUsersCollection.findOne(query, {});

			if (!verifyExistsUser) {
				return res.status(400).send({
					message: 'credentials does not match',
				});
			}

			const verifyPasswordDoesMatch = await compare(
				password,
				verifyExistsUser.password
			);

			if (!verifyPasswordDoesMatch) {
				return res.status(400).send({
					message: 'credentials does not match',
				});
			}

			const token = await jwtAuthService.createJwtToken({
				email: verifyExistsUser.email,
				name: verifyExistsUser.name,
				id: verifyExistsUser._id,
			});

			const filter = { email: verifyExistsUser.email };

			await AuthUsersCollection.updateOne(filter, {
				$set: {
					token,
				},
			});

			return res.status(200).send({
				user: {
					email: verifyExistsUser.email,
					name: verifyExistsUser.name,
				},
				token: token,
			});
		}
	);
}
