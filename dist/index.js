"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _routes = require("./routes");

var _users = require("./routes/users.route");

var _connection = require("./database/connection");

async function start(server) {
  try {
    server.register(_connection.connectionDb);
    server.register(_routes.routes);
    server.register(_users.UsersRoutes);
    await server.listen(process.env.PORT || 3000, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
  }
}