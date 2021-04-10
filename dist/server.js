"use strict";

require("dotenv/config");

var _index = require("./index");

var _fastify = _interopRequireDefault(require("fastify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _fastify.default)({
  logger: true
});

(async () => await (0, _index.start)(server))();