'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentDownLoadVideo = exports.ContentDownLoadImage = exports.UpdateViews = exports.ImageWithCat = exports.VideosWithCat = exports.contentAllVideos = exports.contentAllImages = exports.ContentDownLoad = exports.contentCategory = exports.filterContent = exports.userContent = exports.myContent = exports.contentDelete = exports.contentUpdate = exports.contentCreate = exports.contentSingle = exports.contentAll = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _content = require('./content.model');

var _user = require('../user/user.model');

var _files = require('../files/files.model');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let content;
let contentNew;
let user;
let isMatched;

const filterContent = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.get({
        qr: {
          category: ctx.params.filter
        },
        populate: 'category file',
        sort: '-createdAt'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function filterContent(_x) {
    return _ref.apply(this, arguments);
  };
})();

const ContentDownLoad = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.single({
        qr: {
          _id: ctx.params.id
        }
      });
      user = yield _user.userCrud.single({
        qr: {
          _id: ctx.state.user.uid
        }
      });
      user.downloads.push(content._id);
      yield user.save();
    } catch (error) {
      ctx.throw = {
        message: 'Sorry you don\'t have right to download this'
      };
    }
  });

  return function ContentDownLoad(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const ContentDownLoadImage = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    try {
      user = yield _user.userCrud.single({
        qr: {
          _id: ctx.state.user.uid
        },
        populate: {
          path: 'downloads',
          populate: {
            path: 'file',
            model: 'filesModel'
          }
        }
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = user.downloads;
    }
  });

  return function ContentDownLoadImage(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const ContentDownLoadVideo = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx) {
    try {
      user = yield _user.userCrud.single({
        qr: {
          _id: ctx.state.user.uid
        },
        populate: 'downloads'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = user.downloads;
    }
  });

  return function ContentDownLoadVideo(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

const contentCategory = (() => {
  var _ref5 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.get({
        select: 'category -_id',
        sort: '-createdAt',
        populate: 'category file'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function contentCategory(_x5) {
    return _ref5.apply(this, arguments);
  };
})();

const contentAll = (() => {
  var _ref6 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.get({
        populate: 'file category',
        sort: '-createdAt'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function contentAll(_x6) {
    return _ref6.apply(this, arguments);
  };
})();

const contentAllImages = (() => {
  var _ref7 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.get({
        qr: {
          contentType: 'Image'
        },
        populate: 'file category',
        sort: '-createdAt'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function contentAllImages(_x7) {
    return _ref7.apply(this, arguments);
  };
})();

const contentAllVideos = (() => {
  var _ref8 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.get({
        qr: { contentType: 'Video' },
        populate: 'file category',
        sort: '-createdAt'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function contentAllVideos(_x8) {
    return _ref8.apply(this, arguments);
  };
})();

const VideosWithCat = (() => {
  var _ref9 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.get({
        qr: {
          contentType: 'Video',
          category: ctx.params.category
        },
        populate: 'file category',
        sort: '-createdAt'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function VideosWithCat(_x9) {
    return _ref9.apply(this, arguments);
  };
})();
const ImageWithCat = (() => {
  var _ref10 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.get({
        qr: {
          contentType: 'Image',
          category: ctx.params.category
        },
        populate: 'file category',
        sort: '-createdAt'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function ImageWithCat(_x10) {
    return _ref10.apply(this, arguments);
  };
})();

const myContent = (() => {
  var _ref11 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _user.userCrud.single({
        qr: { _id: ctx.state.user.uid },
        select: 'contents -_id',
        populate: 'contents'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content.contents;
    }
  });

  return function myContent(_x11) {
    return _ref11.apply(this, arguments);
  };
})();

const userContent = (() => {
  var _ref12 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _user.userCrud.single({
        qr: { username: ctx.params.user },
        select: 'contents -_id',
        populate: 'contents'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function userContent(_x12) {
    return _ref12.apply(this, arguments);
  };
})();

const contentSingle = (() => {
  var _ref13 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.single({
        qr: { _id: ctx.params.id },
        populate: 'file category'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function contentSingle(_x13) {
    return _ref13.apply(this, arguments);
  };
})();

const contentCreate = (() => {
  var _ref14 = _asyncToGenerator(function* (ctx) {
    const contentData = _extends({
      author: ctx.state.user.uid
    }, ctx.request.body);
    try {
      contentNew = yield _content.contentCrud.create(contentData);
      const file = yield _files.filesCrud.single({
        qr: contentNew.file
      });
      contentNew.file = file;
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      ctx.body = contentNew;
    }
  });

  return function contentCreate(_x14) {
    return _ref14.apply(this, arguments);
  };
})();

const UpdateViews = (() => {
  var _ref15 = _asyncToGenerator(function* (ctx) {
    try {
      content = yield _content.contentCrud.put({
        params: {
          qr: { _id: ctx.params.id },
          populate: 'file category'
        },
        body: {
          views: ctx.request.body.views,
          shares: ctx.request.body.shares
        }
      });
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      ctx.body = content;
    }
  });

  return function UpdateViews(_x15) {
    return _ref15.apply(this, arguments);
  };
})();

const contentUpdate = (() => {
  var _ref16 = _asyncToGenerator(function* (ctx) {
    try {
      user = yield _user.userCrud.single({
        qr: { _id: ctx.state.user.uid },
        populate: 'file category'
      });
      isMatched = user.acc_type.toLowerCase() === 'admin';
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      if (isMatched) {
        try {
          content = yield _content.contentCrud.put({
            params: {
              qr: { _id: ctx.params.id }
            },
            body: ctx.request.body
          });
        } catch (e) {
          ctx.throw(422, e.message);
        } finally {
          ctx.body = content;
        }
      } else {
        ctx.body = {
          message: 'Sorry you don\'t have right to edit this'
        };
      }
    }
  });

  return function contentUpdate(_x16) {
    return _ref16.apply(this, arguments);
  };
})();

const contentDelete = (() => {
  var _ref17 = _asyncToGenerator(function* (ctx) {
    try {
      user = yield _user.userCrud.single({
        qr: { _id: ctx.state.user.uid }
      });
      isMatched = user.acc_type.toLowerCase() === 'admin';
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      if (isMatched) {
        try {
          content = yield _content.contentCrud.delete({
            params: {
              qr: { _id: ctx.params.id }
            }
          });
        } catch (e) {
          ctx.throw(422, e.message);
        } finally {
          ctx.body = {
            body: content,
            message: 'Deleted'
          };
        }
      } else {
        ctx.body = {
          message: 'Sorry you don\'t have right to delete this'
        };
      }
    }
  });

  return function contentDelete(_x17) {
    return _ref17.apply(this, arguments);
  };
})();

exports.contentAll = contentAll;
exports.contentSingle = contentSingle;
exports.contentCreate = contentCreate;
exports.contentUpdate = contentUpdate;
exports.contentDelete = contentDelete;
exports.myContent = myContent;
exports.userContent = userContent;
exports.filterContent = filterContent;
exports.contentCategory = contentCategory;
exports.ContentDownLoad = ContentDownLoad;
exports.contentAllImages = contentAllImages;
exports.contentAllVideos = contentAllVideos;
exports.VideosWithCat = VideosWithCat;
exports.ImageWithCat = ImageWithCat;
exports.UpdateViews = UpdateViews;
exports.ContentDownLoadImage = ContentDownLoadImage;
exports.ContentDownLoadVideo = ContentDownLoadVideo;