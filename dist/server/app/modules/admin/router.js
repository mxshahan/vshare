'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _middlewares = require('../../middlewares');

var _controller = require('./controller');

const baseUrl = exports.baseUrl = '/api/admin';

const routes = exports.routes = [{
  method: 'GET',
  route: '/category',
  handlers: [_controller.adminCategory]
}, {
  method: 'GET',
  route: '/category/:filter',
  handlers: [_controller.filteradmin]
}, {
  method: 'GET',
  route: '/user/:user',
  handlers: [_controller.useradmin]
}, {
  method: 'GET',
  route: '/my',
  handlers: [_middlewares.isAuthenticated, _controller.myadmin]
}, {
  method: 'GET',
  route: '/',
  handlers: [_controller.adminAll]
}, {
  method: 'GET',
  route: '/:id',
  handlers: [_controller.adminSingle]
}, {
  method: 'PUT',
  route: '/:id',
  handlers: [_middlewares.isAuthenticated, _controller.adminUpdate]
}, {
  method: 'DELETE',
  route: '/:id',
  handlers: [_middlewares.isAuthenticated, _controller.adminDelete]
}, {
  method: 'POST',
  route: '/',
  handlers: [_middlewares.isAuthenticated, _controller.adminCreate]
}];