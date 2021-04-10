import 'dotenv/config';

import { start } from './index';

import fastify from 'fastify';

const server = fastify({
	logger: true,
});

(async () => await start(server))();
