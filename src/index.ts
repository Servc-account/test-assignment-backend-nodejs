import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();
const PORT = 3000;

router.get('/', (ctx) => {
  ctx.body = { sup: 'bitches' };
});

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

app.use(router.routes());

app.listen(PORT);
console.log(`listening port ${PORT}`);
