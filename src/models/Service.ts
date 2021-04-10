import { RouteOptions } from 'fastify';

type Methods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

interface CustomConfig {
	url: string;
	method: Methods;
}

type RouterConfig = Omit<
	RouteOptions,
	'handler' | 'preHandler' | 'errorHandler'
>;

export class Service {
	protected routerConfig: RouterConfig;

	constructor(config: RouterConfig) {
		this.routerConfig = config;
	}

	protected async handler(): Promise<any> {}

	protected async preHandler(): Promise<any> {}

	protected async errorHandler(): Promise<any> {}

	public build(): RouteOptions {
		return {
			...this.routerConfig,
			handler: this.handler,
			preHandler: this.preHandler,
			errorHandler: this.errorHandler,
		};
	}
}
