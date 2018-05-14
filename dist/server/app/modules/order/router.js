'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _middlewares = require('../../middlewares');

var _controller = require('./controller');

const baseUrl = exports.baseUrl = '/api/order';

const routes = exports.routes = [{
  method: 'GET',
  route: '/order/all',
  handlers: [_middlewares.isAuthenticated, _controller.OrderAll]
}, {
  method: 'POST',
  route: '/contact',
  handlers: [_controller.ContactUs]
}, {
  method: 'GET',
  route: '/:id',
  handlers: [_controller.OrderSingle]
}, {
  method: 'PUT',
  route: '/',
  handlers: [_middlewares.isAuthenticated, _controller.OrderUpdate]
}, {
  method: 'DELETE',
  route: '/',
  handlers: [_middlewares.isAuthenticated, _controller.OrderDelete]
}, {
  method: 'POST',
  route: '/create',
  handlers: [_controller.OrderCreate]
}];