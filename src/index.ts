import Koa from 'koa';
const app = new Koa();

const PORT = 3000;

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
  ctx.body = { sup: 'bitches' };
});

app.listen(PORT);
console.log(`listening port ${PORT}`);
