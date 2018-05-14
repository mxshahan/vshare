'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFiles = exports.filesCreate = undefined;

var _utility = require('../../utility');

var _files = require('./files.model');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let filesNew;

const bulkUpdate = options => new Promise((resolve, reject) => {
  _files.filesModel.insertMany(options).then(result => {
    resolve(result);
  }).catch(err => {
    reject(err);
  });
});

const filesCreate = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    const rawFiles = ctx.request.body.files.docs;
    const fileNames = [];
    let filename;
    if (rawFiles instanceof Array) {
      yield Promise.all(rawFiles.map((() => {
        var _ref2 = _asyncToGenerator(function* (file) {
          filename = yield (0, _utility.fileUpload)(file);
          fileNames.push({
            filename,
            permalink: `/public/${filename}`
          });
        });

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      })()));

      try {
        filesNew = yield bulkUpdate(fileNames);
      } catch (e) {
        ctx.throw(422, {
          success: 0,
          message: e.message
        });
      } finally {
        ctx.body = {
          success: 1,
          files: filesNew,
          message: 'All files uploaded'
        };
      }
    } else {
      filename = yield (0, _utility.fileUpload)(rawFiles);
      try {
        filesNew = yield _files.filesCrud.create({
          filename,
          permalink: `/public/${filename}`
        });
      } catch (e) {
        ctx.throw(422, {
          success: 0,
          message: e.message
        });
      } finally {
        ctx.body = {
          success: 1,
          files: filesNew,
          message: 'Files uploaded'
        };
      }
    }
  });

  return function filesCreate(_x) {
    return _ref.apply(this, arguments);
  };
})();

const deleteFiles = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    try {
      filesNew = yield _files.filesCrud.delete({
        params: {
          qr: {
            _id: ctx.request.body.fileId
          }
        }
      });
      yield (0, _utility.fileDelete)(filesNew.filename);
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          files: filesNew
        },
        message: 'File deleted'
      };
    }
  });

  return function deleteFiles(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

exports.filesCreate = filesCreate;
exports.deleteFiles = deleteFiles;