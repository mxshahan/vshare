'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminCategory = exports.filteradmin = exports.useradmin = exports.myadmin = exports.adminDelete = exports.adminLogin = exports.adminUpdate = exports.adminCreate = exports.adminSingle = exports.adminAll = undefined;

var _admin = require('./admin.model');

var _user = require('../user/user.model');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let admin;
let adminNew;
let user;
let isMatched;

const filteradmin = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    try {
      admin = yield _admin.adminCrud.get({
        qr: { category: ctx.params.filter },
        populate: 'author category'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = admin;
    }
  });

  return function filteradmin(_x) {
    return _ref.apply(this, arguments);
  };
})();

const adminCategory = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    try {
      admin = yield _admin.adminCrud.get({
        select: 'category -_id',
        populate: 'category'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = admin;
    }
  });

  return function adminCategory(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const adminAll = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    try {
      admin = yield _admin.adminCrud.get({
        populate: 'author'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = admin;
    }
  });

  return function adminAll(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const myadmin = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx) {
    try {
      admin = yield _user.userCrud.single({
        qr: { _id: ctx.state.user.uid },
        select: 'admins -_id',
        populate: 'admins'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = admin.admins;
    }
  });

  return function myadmin(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

const useradmin = (() => {
  var _ref5 = _asyncToGenerator(function* (ctx) {
    try {
      admin = yield _user.userCrud.single({
        qr: { username: ctx.params.user },
        select: 'admins -_id',
        populate: 'admins'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = admin;
    }
  });

  return function useradmin(_x5) {
    return _ref5.apply(this, arguments);
  };
})();

const adminSingle = (() => {
  var _ref6 = _asyncToGenerator(function* (ctx) {
    try {
      admin = yield _admin.adminCrud.single({
        qr: { _id: ctx.params.id },
        populate: 'author'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = admin;
    }
  });

  return function adminSingle(_x6) {
    return _ref6.apply(this, arguments);
  };
})();

// const adminCreate = async (ctx) => {
//   console.log(ctx.request.body);
//   const adminData = Object.assign({
//     author: ctx.state.user.uid
//   }, ctx.request.body);
//   try {
//     adminNew = await adminCrud.create(adminData);
//   } catch (e) {
//     ctx.throw(422, e.message);
//   } finally {
//     try {
//       user = await userCrud.single({
//         qr: { _id: ctx.state.user.uid }
//       });
//     } catch (e) {
//       ctx.throw(422, e.message);
//     } finally {
//       user.admins.push(adminNew._id);
//       user.save();
//       ctx.body = {
//         body: adminNew,
//         message: 'Post is successful'
//       };
//     }
//   }
// };

const adminUpdate = (() => {
  var _ref7 = _asyncToGenerator(function* (ctx) {
    try {
      user = yield _user.userCrud.single({
        qr: { _id: ctx.state.user.uid }
      });
      isMatched = user.admins.indexOf(ctx.params.id);
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      if (isMatched !== -1) {
        try {
          admin = yield _admin.adminCrud.put({
            params: {
              qr: { _id: ctx.params.id }
            },
            body: ctx.request.body
          });
        } catch (e) {
          ctx.throw(422, e.message);
        } finally {
          ctx.body = {
            body: admin,
            message: 'Post Updated..'
          };
        }
      } else {
        ctx.body = {
          message: 'Sorry you don\'t have right to edit this'
        };
      }
    }
  });

  return function adminUpdate(_x7) {
    return _ref7.apply(this, arguments);
  };
})();

//====================Shuvojit==================

const adminCreate = (() => {
  var _ref8 = _asyncToGenerator(function* (ctx) {
    // console.log(ctx.request.body);
    try {
      adminNew = yield _admin.adminCrud.create(ctx.request.body);
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      token = yield generateJwt({
        uid: adminNew._id
      });
      ctx.body = {
        acc_type: adminNew.acc_type,
        token,
        message: 'SignUp Successfull...'
      };
    }
  });

  return function adminCreate(_x8) {
    return _ref8.apply(this, arguments);
  };
})();

const adminLogin = (() => {
  var _ref9 = _asyncToGenerator(function* (ctx) {
    admin = yield _admin.adminCrud.single({
      qr: { email: ctx.request.body.email }
    });
    try {
      if (admin) {
        VerifyAdmin = yield compareSync(ctx.request.body.password, admin.password);
      }
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      if (VerifyAdmin) {
        token = yield generateJwt({
          uid: admin._id
        });
        ctx.body = {
          acc_type: admin.acc_type,
          token,
          message: 'Login Successfull...'
        };
      }
    }
  });

  return function adminLogin(_x9) {
    return _ref9.apply(this, arguments);
  };
})();

//=================Shuvojit======================


const adminDelete = (() => {
  var _ref10 = _asyncToGenerator(function* (ctx) {
    try {
      user = yield _user.userCrud.single({
        qr: { _id: ctx.state.user.uid }
      });
      isMatched = user.admins.indexOf(ctx.params.id);
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      if (isMatched !== -1) {
        try {
          admin = yield _admin.adminCrud.delete({
            params: {
              qr: { _id: ctx.params.id }
            }
          });
        } catch (e) {
          ctx.throw(422, e.message);
        } finally {
          ctx.body = {
            body: admin,
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

  return function adminDelete(_x10) {
    return _ref10.apply(this, arguments);
  };
})();

exports.adminAll = adminAll;
exports.adminSingle = adminSingle;
exports.adminCreate = adminCreate;
exports.adminUpdate = adminUpdate;
exports.adminLogin = adminLogin;
exports.adminDelete = adminDelete;
exports.myadmin = myadmin;
exports.useradmin = useradmin;
exports.filteradmin = filteradmin;
exports.adminCategory = adminCategory;