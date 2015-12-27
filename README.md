# koa-viewer
Directory and file viewer for koa 2


## Usage

**Scene 1:**
```js

import Koa from 'koa';
import viewer from 'koa-viewer';
const app = new Koa();

app.use(viewer());

app.listen(3000, function() {
    console.log('Server listening on http://localhost:3000')
});

```

**Scene 2:**
```js

import Koa from 'koa';
import viewer from 'koa-viewer';
const app = new Koa();

app.use(async(ctx, next) => {

  ctx.body = await viewer(process.cwd(), {
    flat: true,
    nodir: true,
    dot: false
  })(ctx);

  await next();

});

app.listen(3000, function() {
    console.log('Server listening on http://localhost:3000')
});

```

## API

```js
viewer([root], [options])
```

- root: String, root directory, default: `process.cwd()`

**options:**

- `flat`: Boolean, default is `false`, when `true`, list files in the flat way.
- [node-glob](https://github.com/isaacs/node-glob): support `glob` options



## Development

1. `git clone https://github.com/neikvon/koa-viewer.git`
3. `npm run watch`
