'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _middlewares = require('../../middlewares');

var _controller = require('./controller');

const baseUrl = exports.baseUrl = '/api/files';

const routes = exports.routes = [{
  method: 'POST',
  route: '/',
  handlers: [_middlewares.isAuthenticated, _controller.filesCreate]
}, {
  method: 'POST',
  route: '/delete',
  handlers: [_middlewares.isAuthenticated, _controller.deleteFiles]
}];