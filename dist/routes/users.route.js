"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRoutes = UsersRoutes;

var _jwtAuthService = require("../services/jwtAuthService");

var _bcrypt = require("bcrypt");

async function UsersRoutes(server) {
  var _server$mongo$db;

  const AuthUsersCollection = (_server$mongo$db = server.mongo.db) === null || _server$mongo$db === void 0 ? void 0 : _server$mongo$db.collection('AuthUsersCollection');
  const authUsersPostSchema = {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          }
        }
      }
    }
  };
  server.post('/authUsers', authUsersPostSchema, async (req, res) => {
    const {
      email,
      name,
      password
    } = req.body;
    const query = {
      email
    };
    const verifyExistsUser = await AuthUsersCollection.findOne(query);

    if (verifyExistsUser) {
      res.status(400).send({
        message: 'User already exits!'
      });
    }

    const createdPasswordHash = await (0, _bcrypt.hash)(password, 8);
    await AuthUsersCollection.insertOne({
      email,
      name,
      password: createdPasswordHash
    });
  });
  const validateLoginUserRequestSchema = {
    schema: {
      body: {
        type: 'object',
        properties: {
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          }
        }
      },
      response: {
        user: {
          type: 'object',
          properties: {
            email: {
              type: 'string'
            },
            name: {
              type: 'string'
            }
          }
        },
        token: {
          type: 'string'
        }
      }
    }
  };
  server.post('/authUsers/login', validateLoginUserRequestSchema, async (req, res) => {
    const {
      email,
      password
    } = req.body;
    const query = {
      email
    };
    const verifyExistsUser = await AuthUsersCollection.findOne(query, {});

    if (!verifyExistsUser) {
      return res.status(400).send({
        message: 'credentials does not match'
      });
    }

    const verifyPasswordDoesMatch = await (0, _bcrypt.compare)(password, verifyExistsUser.password);

    if (!verifyPasswordDoesMatch) {
      return res.status(400).send({
        message: 'credentials does not match'
      });
    }

    const token = await _jwtAuthService.jwtAuthService.createJwtToken({
      email: verifyExistsUser.email,
      name: verifyExistsUser.name,
      id: verifyExistsUser._id
    });
    const filter = {
      email: verifyExistsUser.email
    };
    await AuthUsersCollection.updateOne(filter, {
      $set: {
        token
      }
    });
    return res.status(200).send({
      user: {
        email: verifyExistsUser.email,
        name: verifyExistsUser.name
      },
      token: token
    });
  });
}