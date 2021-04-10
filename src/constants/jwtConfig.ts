export default {
	secret: process.env.JWT_SECRET,
	expiresIn: '3d',
} as {
	secret: string;
	expiresIn: string;
};
