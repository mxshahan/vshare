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
  route: '/all',
  handlers: [_middlewares.isAuthenticated, _controller.OrderAll]
}, {
  method: 'GET',
  route: '/image',
  handlers: [_middlewares.isAuthenticated, _controller.OrderImage]
}, {
  method: 'GET',
  route: '/video',
  handlers: [_middlewares.isAuthenticated, _controller.OrderVideo]
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
  handlers: [_middlewares.isAuthenticated, _controller.OrderCreate]
}, {
  method: 'POST',
  route: '/contact',
  handlers: [_controller.ContactUs]
}];