import { sign, verify } from 'jsonwebtoken';
import jwtConstants from '../constants/jwtConfig';

interface JWTProvider {
	createToken: (args: Object) => Promise<string>;
	verifyToken: (token: string) => Promise<Object | string>;
}

interface JWTAuthService {
	createJwtToken: (args: Object) => Promise<string>;
	verifyJwtToken: (token: string) => Promise<Object | string>;
}

function JsonTokenProvider(): JWTProvider {
	const createToken = async (args: Object) =>
		sign(args, jwtConstants.secret, {
			expiresIn: jwtConstants.expiresIn,
		});

	const verifyToken = async (token: string) => {
		const currentToken = verify(token, jwtConstants.secret);

		return currentToken;
	};

	return {
		createToken,
		verifyToken,
	};
}

function Service(jwtProvider: JWTProvider): JWTAuthService {
	const createJwtToken = async (args: Object) => jwtProvider.createToken(args);

	const verifyJwtToken = async (token: string) =>
		jwtProvider.verifyToken(token);

	return {
		createJwtToken,
		verifyJwtToken,
	};
}

export const jwtAuthService = Service(JsonTokenProvider());
