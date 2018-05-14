'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = exports.OrderController = exports.OrderRouteProps = undefined;

var _router = require('./router');

var _OrderRouteProps = _interopRequireWildcard(_router);

var _controller = require('./controller');

var _OrderController = _interopRequireWildcard(_controller);

var _order = require('./order.model');

var _OrderModel = _interopRequireWildcard(_order);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.OrderRouteProps = _OrderRouteProps;
exports.OrderController = _OrderController;
exports.OrderModel = _OrderModel;