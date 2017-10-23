
//
const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const GameController = require('./server/index.js');

//
const app = new Koa();

// 返回 字符串
// app.use(async ctx => {
// 	ctx.body = "It\'s the Beat Winners.";
// })

app.use(views(__dirname + '/views', {
	extension: 'html'
}));

router.get('/', async (ctx, next) => {
	await ctx.render('index');
});

router.get('/dStore', async (ctx, next) => {
	await ctx.render('dStore');
})

router.get('/getDanmaku', GameController.getDanmaku);

router.post('/pushDanmaku', GameController.pushDanmaku);

app.use(router.routes());

app.listen(3000);