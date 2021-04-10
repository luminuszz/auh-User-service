"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = void 0;

class Service {
  constructor(config) {
    this.routerConfig = config;
  }

  async handler() {}

  async preHandler() {}

  async errorHandler() {}

  build() {
    return { ...this.routerConfig,
      handler: this.handler,
      preHandler: this.preHandler,
      errorHandler: this.errorHandler
    };
  }

}

exports.Service = Service;