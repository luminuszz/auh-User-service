"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

async function routes(server) {
  var _server$mongo$db;

  const usersCollection = (_server$mongo$db = server.mongo.db) === null || _server$mongo$db === void 0 ? void 0 : _server$mongo$db.collection('users');
  const userSchema = {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          email: {
            type: 'string'
          }
        }
      }
    }
  };
  server.post('/users', userSchema, async manager => {
    const {
      email,
      name
    } = manager.body;
    await usersCollection.insertOne({
      email,
      name
    });
    return {
      ok: true
    };
  });
}