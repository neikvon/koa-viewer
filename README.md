# koa-viewer
Directory and file viewer for koa 2


# usage
```javascript

import Koa from 'koa';
import viewer from 'koa-viewer';
const app = new Koa();

app.use(viewer());

app.listen(3000, function() {
    console.log('Server listening on http://localhost:3000')
});

```

```javascript

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
