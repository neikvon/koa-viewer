import fs from 'fs';
import path from 'path';
import glob from 'glob';
import etag from 'etag';
import mime from 'mime';

const head = `
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="black">
   <meta name="format-detection" content="telephone=no">
   <meta name="screen-orientation" content="portrait">
   <meta name="x5-orientation" content="portrait">
   <style>
     *,
     *:before,
     *:after {
       box-sizing: border-box;
     }
     body{
       margin: 0;
       padding: 0;
       font-size: 87.5%;
       font-family: Consolas, Tahoma;
     }
     a{
       text-decoration: none;
       color: #333;
     }
     a:hover{
       background: #eaeaea;
     }
     ul{
       list-style-type: none;
       margin: 0;
       padding: 0;
     }
     .crumb{
       margin-bottom: 1em;
       padding: 1em;
       background: #333;
     }
     .crumb li{
       display: inline;
       margin-right: 5px;
       color: #ccc;
     }
     .crumb li a{
       color: #ccc;
     }
     .crumb li a:hover{
       text-decoration: underline;
       background: inherit;
     }
     .list{
       margin-bottom: 1em;
     }
     .list li{
       min-height: .5em;
       display: inline-block;
       width: 33.33%;
     }
     .list.block li{
       width: 100%;
     }
     .list li a{
       display: block;
       padding: 0 1em;
       line-height: 2;
     }
     @media only screen and (max-width : 768px) {
       .list li{
         display: block;
         width: 100%;
       }
       .list li a{
         line-height: 3;
         border-bottom: 1px dotted #ccc;
       }
     }
   </style>
 `;

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
export default (root, opts) => {

  root = (!root || root === '') ? process.cwd() : root;
  opts = opts || {};

  return async(ctx, next) => {

    if (!next) {
      return await genHtml(ctx, root, opts);
    } else {

      console.log('Send: ' + ctx.path);
      ctx.body = await genHtml(ctx, root, opts);

      return next();
    }

  }
}

async function genHtml(ctx, root, opts) {
  try {
    let url = ctx.path;
    const realPath = path.join(root, url);
    const stats = await statp(realPath);

    // folder
    if (stats.isDirectory()) {

      let settings = {
        flat: false,
        cwd: realPath,
        nodir: false,
        dot: false
      };

      let html = `
             ${head}
             {crumb}
             {list}
           `;
      let listHtml = '';
      let listHtml_folder = '<ul class="list">';
      let listHtml_file = '<ul class="list">';
      let crumbHtml = '<ul class="crumb">';
      merge(settings, opts);

      if (settings.flat) {
        settings.nodir = opts.nodir === undefined ? true : opts.nodir;
        const list = await globPromise('**/*', settings);
        crumbHtml += '<li>' + url + ':</li></ul>';
        listHtml += '<ul class="list block">';
        for (let item of list) {
          listHtml += '<li><a href="' + url + item + '">' + item + '</a></li>'
        }
        listHtml += '</ul>';
      } else {
        const list = await globPromise('*', settings);
        for (let item of list) {
          const itemStats = await statp(realPath + item);
          if (itemStats.isDirectory()) {
            listHtml_folder += '<li><a href="' + url + item + '/">' + item + '/</a></li>'
          } else {
            listHtml_file += '<li><a href="' + url + item + '">' + item + '</a></li>'
          }
        }
        listHtml_folder += '</ul>';
        listHtml_file += '</ul>';
        listHtml = listHtml_folder + listHtml_file;
        crumbHtml += '<li><a href="/">/</a></li>';

        if (url !== '/') {
          let dirUrl = '/';
          const urlArr = url.substr(1, url.length - 2).split('/');
          for (let u of urlArr) {
            dirUrl += u + '/';
            crumbHtml += '<li><a href="' + dirUrl + '">' + u + '/</a></li>'
          }
        }
        crumbHtml += '</ul>';
      }

      html = html.replace('{crumb}', crumbHtml).replace('{list}', listHtml);

      return html;
    }

    // file
    if (stats.isFile()) {
      const type = mime.lookup(realPath);
      const charset = mime.charsets.lookup(type);
      const headers = {
        ETag: etag(stats),
        'Content-Type': type + (charset ? '; charset=' + charset : ''),
        'Content-Length': stats.size,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
      };
      ctx.set(headers);
      return fs.createReadStream(realPath);
    }

  } catch (err) {
    throw err;
  }
}

function merge(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function(source) {
    for (var p in source)
      if (typeof source[p] === 'object') {
        target[p] = target[p] || (Array.isArray(source[p]) ? [] : {});
        merge(target[p], source[p]);
      } else {
        target[p] = source[p];
      }
  })
  return target;
}

function globPromise(pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) => {
      return err === null ? resolve(files) : reject(err)
    })
  })
}

function statp(realPath) {
  return new Promise((resolve, reject) => {
    fs.stat(realPath, (err, stats) => {
      return err === null ? resolve(stats) : reject(err)
    })
  })
}
