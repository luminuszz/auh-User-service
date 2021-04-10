"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtAuthService = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _jwtConfig = _interopRequireDefault(require("../constants/jwtConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function JsonTokenProvider() {
  const createToken = async (args) => (0, _jsonwebtoken.sign)(args, _jwtConfig.default.secret, {
    expiresIn: _jwtConfig.default.expiresIn
  });

  const verifyToken = async token => {
    const currentToken = (0, _jsonwebtoken.verify)(token, _jwtConfig.default.secret);
    return currentToken;
  };

  return {
    createToken,
    verifyToken
  };
}

function Service(jwtProvider) {
  const createJwtToken = async args => jwtProvider.createToken(args);

  const verifyJwtToken = async (token) => jwtProvider.verifyToken(token);

  return {
    createJwtToken,
    verifyJwtToken
  };
}

const jwtAuthService = Service(JsonTokenProvider());
exports.jwtAuthService = jwtAuthService;