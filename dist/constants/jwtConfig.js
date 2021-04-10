"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  secret: process.env.JWT_SECRET,
  expiresIn: '3d'
};
exports.default = _default;