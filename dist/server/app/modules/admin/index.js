'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminModel = exports.adminController = exports.adminRouteProps = undefined;

var _router = require('./router');

var _adminRouteProps = _interopRequireWildcard(_router);

var _controller = require('./controller');

var _adminController = _interopRequireWildcard(_controller);

var _admin = require('./admin.model');

var _adminModel = _interopRequireWildcard(_admin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.adminRouteProps = _adminRouteProps;
exports.adminController = _adminController;
exports.adminModel = _adminModel;