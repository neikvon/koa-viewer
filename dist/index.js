'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var genHtml = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, root, opts) {
    var url, realPath, stats, settings, html, listHtml, listHtml_folder, listHtml_file, crumbHtml, list, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, _list, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _item, itemStats, dirUrl, urlArr, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, u, type, charset, headers;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            url = ctx.path;
            realPath = _path2.default.join(root, url);
            _context2.next = 5;
            return statp(realPath);

          case 5:
            stats = _context2.sent;

            if (!stats.isDirectory()) {
              _context2.next = 103;
              break;
            }

            settings = {
              flat: false,
              cwd: realPath,
              nodir: false,
              dot: false
            };
            html = '\n             ' + head + '\n             {crumb}\n             {list}\n           ';
            listHtml = '';
            listHtml_folder = '<ul class="list">';
            listHtml_file = '<ul class="list">';
            crumbHtml = '<ul class="crumb">';

            merge(settings, opts);

            if (!settings.flat) {
              _context2.next = 43;
              break;
            }

            settings.nodir = opts.nodir === undefined ? true : opts.nodir;
            _context2.next = 18;
            return globPromise('**/*', settings);

          case 18:
            list = _context2.sent;

            crumbHtml += '<li>' + url + ':</li></ul>';
            listHtml += '<ul class="list block">';
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 24;
            for (_iterator = (0, _getIterator3.default)(list); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              item = _step.value;

              listHtml += '<li><a href="' + url + item + '">' + item + '</a></li>';
            }
            _context2.next = 32;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2['catch'](24);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 32:
            _context2.prev = 32;
            _context2.prev = 33;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 35:
            _context2.prev = 35;

            if (!_didIteratorError) {
              _context2.next = 38;
              break;
            }

            throw _iteratorError;

          case 38:
            return _context2.finish(35);

          case 39:
            return _context2.finish(32);

          case 40:
            listHtml += '</ul>';
            _context2.next = 101;
            break;

          case 43:
            _context2.next = 45;
            return globPromise('*', settings);

          case 45:
            _list = _context2.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 49;
            _iterator2 = (0, _getIterator3.default)(_list);

          case 51:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 60;
              break;
            }

            _item = _step2.value;
            _context2.next = 55;
            return statp(realPath + _item);

          case 55:
            itemStats = _context2.sent;

            if (itemStats.isDirectory()) {
              listHtml_folder += '<li><a href="' + url + _item + '/">' + _item + '/</a></li>';
            } else {
              listHtml_file += '<li><a href="' + url + _item + '">' + _item + '</a></li>';
            }

          case 57:
            _iteratorNormalCompletion2 = true;
            _context2.next = 51;
            break;

          case 60:
            _context2.next = 66;
            break;

          case 62:
            _context2.prev = 62;
            _context2.t1 = _context2['catch'](49);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 66:
            _context2.prev = 66;
            _context2.prev = 67;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 69:
            _context2.prev = 69;

            if (!_didIteratorError2) {
              _context2.next = 72;
              break;
            }

            throw _iteratorError2;

          case 72:
            return _context2.finish(69);

          case 73:
            return _context2.finish(66);

          case 74:
            listHtml_folder += '</ul>';
            listHtml_file += '</ul>';
            listHtml = listHtml_folder + listHtml_file;
            crumbHtml += '<li><a href="/">/</a></li>';

            if (!(url !== '/')) {
              _context2.next = 100;
              break;
            }

            dirUrl = '/';
            urlArr = url.substr(1, url.length - 2).split('/');
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context2.prev = 84;

            for (_iterator3 = (0, _getIterator3.default)(urlArr); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              u = _step3.value;

              dirUrl += u + '/';
              crumbHtml += '<li><a href="' + dirUrl + '">' + u + '/</a></li>';
            }
            _context2.next = 92;
            break;

          case 88:
            _context2.prev = 88;
            _context2.t2 = _context2['catch'](84);
            _didIteratorError3 = true;
            _iteratorError3 = _context2.t2;

          case 92:
            _context2.prev = 92;
            _context2.prev = 93;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 95:
            _context2.prev = 95;

            if (!_didIteratorError3) {
              _context2.next = 98;
              break;
            }

            throw _iteratorError3;

          case 98:
            return _context2.finish(95);

          case 99:
            return _context2.finish(92);

          case 100:
            crumbHtml += '</ul>';

          case 101:

            html = html.replace('{crumb}', crumbHtml).replace('{list}', listHtml);

            return _context2.abrupt('return', html);

          case 103:
            if (!stats.isFile()) {
              _context2.next = 109;
              break;
            }

            type = _mime2.default.lookup(realPath);
            charset = _mime2.default.charsets.lookup(type);
            headers = {
              ETag: (0, _etag2.default)(stats),
              'Content-Type': type + (charset ? '; charset=' + charset : ''),
              'Content-Length': stats.size,
              'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
              Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
            };

            ctx.set(headers);
            return _context2.abrupt('return', _fs2.default.createReadStream(realPath));

          case 109:
            _context2.next = 114;
            break;

          case 111:
            _context2.prev = 111;
            _context2.t3 = _context2['catch'](0);
            throw _context2.t3;

          case 114:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 111], [24, 28, 32, 40], [33,, 35, 39], [49, 62, 66, 74], [67,, 69, 73], [84, 88, 92, 100], [93,, 95, 99]]);
  }));

  return function genHtml(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _etag = require('etag');

var _etag2 = _interopRequireDefault(_etag);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var head = '\n   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">\n   <meta name="apple-mobile-web-app-capable" content="yes">\n   <meta name="apple-mobile-web-app-status-bar-style" content="black">\n   <meta name="format-detection" content="telephone=no">\n   <meta name="screen-orientation" content="portrait">\n   <meta name="x5-orientation" content="portrait">\n   <style>\n     *,\n     *:before,\n     *:after {\n       box-sizing: border-box;\n     }\n     body{\n       margin: 0;\n       padding: 0;\n       font-size: 87.5%;\n       font-family: Consolas, Tahoma;\n     }\n     a{\n       text-decoration: none;\n       color: #333;\n     }\n     a:hover{\n       background: #eaeaea;\n     }\n     ul{\n       list-style-type: none;\n       margin: 0;\n       padding: 0;\n     }\n     .crumb{\n       margin-bottom: 1em;\n       padding: 1em;\n       background: #333;\n     }\n     .crumb li{\n       display: inline;\n       margin-right: 5px;\n       color: #ccc;\n     }\n     .crumb li a{\n       color: #ccc;\n     }\n     .crumb li a:hover{\n       text-decoration: underline;\n       background: inherit;\n     }\n     .list{\n       margin-bottom: 1em;\n     }\n     .list li{\n       min-height: .5em;\n       display: inline-block;\n       width: 33.33%;\n     }\n     .list.block li{\n       width: 100%;\n     }\n     .list li a{\n       display: block;\n       padding: 0 1em;\n       line-height: 2;\n     }\n     @media only screen and (max-width : 768px) {\n       .list li{\n         display: block;\n         width: 100%;\n       }\n       .list li a{\n         line-height: 3;\n         border-bottom: 1px dotted #ccc;\n       }\n     }\n   </style>\n ';

/**
 * [description]
 * @param  {[type]} root [description]
 * @param  {[json]} opts:
 {
  flat: false,
  cwd: realPath,
  nodir: false,
  dot: false
 }
 * @return {[type]}      [description]
 */

exports.default = function (root, opts) {
  root = !root || root === '' ? process.cwd() : root;
  opts = opts || {};

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (next) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return genHtml(ctx, root, opts);

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:

              console.log('Send: ' + ctx.path);
              _context.next = 9;
              return genHtml(ctx, root, opts);

            case 9:
              ctx.body = _context.sent;
              return _context.abrupt('return', next());

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

function merge(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var p in source) {
      if ((0, _typeof3.default)(source[p]) === 'object') {
        target[p] = target[p] || (Array.isArray(source[p]) ? [] : {});
        merge(target[p], source[p]);
      } else {
        target[p] = source[p];
      }
    }
  });
  return target;
}

function globPromise(pattern, options) {
  return new _promise2.default(function (resolve, reject) {
    (0, _glob2.default)(pattern, options, function (err, files) {
      return err === null ? resolve(files) : reject(err);
    });
  });
}

function statp(realPath) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.stat(realPath, function (err, stats) {
      return err === null ? resolve(stats) : reject(err);
    });
  });
}
//# sourceMappingURL=index.js.map