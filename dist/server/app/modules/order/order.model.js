'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = exports.OrderCrud = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OrderSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  file: {
    type: String
  },
  owner: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'userModel'
  },
  contentType: {
    type: String,
    default: 'Video'
  },
  status: {
    type: String,
    default: 'pending'
  }
});
// import { genSaltSync, hashSync } from 'bcryptjs';


OrderSchema.plugin(_mongooseUniqueValidator2.default);
OrderSchema.plugin(_mongooseTimestamp2.default);

const OrderModel = _mongoose2.default.model('OrderModel', OrderSchema);
const OrderCrud = new _utility.Crud(OrderModel);

exports.OrderCrud = OrderCrud;
exports.OrderModel = OrderModel;