"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionDb = void 0;

var _fastifyPlugin = _interopRequireDefault(require("fastify-plugin"));

var _fastifyMongodb = _interopRequireDefault(require("fastify-mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createConnection(server) {
  server.register(_fastifyMongodb.default, {
    url: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    database: 'auth_db'
  });
}

const connectionDb = (0, _fastifyPlugin.default)(createConnection);
exports.connectionDb = connectionDb;