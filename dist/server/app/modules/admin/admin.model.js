'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminModel = exports.adminCrud = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import uniqueValidator from 'mongoose-unique-validator';
const adminSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'CategoryModel',
    required: true
  },
  description: {
    type: String
  },
  author: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'userModel'
  },
  parmalink: {
    type: String,
    required: true
  },
  tag: [{
    type: String
  }],
  price: {
    type: String,
    default: '0'
  },
  like: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'userModel'
  }],
  comments: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'commentModel'
  }],
  thumbnail: {
    type: String
  }
});

// adminSchema.plugin(uniqueValidator);
adminSchema.plugin(_mongooseTimestamp2.default);

const adminModel = _mongoose2.default.model('adminModel', adminSchema);
const adminCrud = new _utility.Crud(adminModel);

exports.adminCrud = adminCrud;
exports.adminModel = adminModel;