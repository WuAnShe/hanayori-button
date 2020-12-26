const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const { debug } = require('console');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Replace with DB

const things = ['My Family', 'Programming', 'Music'];

// Json Prettier Middleware
app.use(json());
//  BodyParser Middleware
app.use(bodyParser())

// Add additional properties to context
app.context.user = 'Brad';

// Simple Middleware Example
// app.use(async ctx => (ctx.body = { msg: 'HelloWorld' }));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,
})

//Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);
//List of things
async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I Love:',
        things
    });
}

async function showAdd(ctx) {
    await ctx.render('add');
}

//Add thing
async function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}



router.get('/test', ctx => ctx.body = `Hello ${ctx.user}`);
router.get('/test2/:name', ctx => ctx.body = `Hello ${ctx.params.name}`);

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));