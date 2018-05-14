'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileDelete = exports.fileUpload = undefined;

var _shortid = require('shortid');

var _path = require('path');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fileUpload = (() => {
  var _ref = _asyncToGenerator(function* (file) {
    const ext = file.name.split('.');
    const newFilename = `${Date.now()}-${(0, _shortid.generate)()}.${ext[1]}`;
    const filePath = (0, _path.join)(_config2.default.get('paths.static'), `/public/${newFilename}`);
    try {
      yield _fsExtra2.default.copy(file.path, filePath);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
    return newFilename;
  });

  return function fileUpload(_x) {
    return _ref.apply(this, arguments);
  };
})();

const fileDelete = (() => {
  var _ref2 = _asyncToGenerator(function* (file) {
    const filePath = (0, _path.join)(_config2.default.get('paths.static'), file);
    try {
      yield _fsExtra2.default.remove(filePath);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
    return file;
  });

  return function fileDelete(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

exports.fileUpload = fileUpload;
exports.fileDelete = fileDelete;