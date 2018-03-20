const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const webconfig = require('./build/webconfig');
const session = require("koa-generic-session");
const FileStore = require("koa-generic-session-file2");
//const proxy = require('koa-proxies')

const middleware = require('koa-webpack');
const history = require('./middleware/koa2-connect-history-api-fallback');

app.keys = ['secret1', 'secret2'];
app.use(session({
    key: "sjk_sid",
    cookie: {
        maxage: 30 * 60 * 1000
    },
    store: new FileStore({
        sessionDirectory: "./sessions/"
    })
}));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
    //multipart: true
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// app.use(proxy('/rest', {
//     target: 'http://localhost:21792/testdbd/html/test_get_post/test.aspx' + this.session.user_id,
//     changeOrigin: true,
//     logs: true
// }))

// routes
let apistr = 'api';
if (webconfig.mock) { //mock_data
    apistr = 'mock'
}
const users = require('./routes/' + apistr + '/users')
const datasources = require('./routes/' + apistr + '/datasources')
const datasets = require('./routes/' + apistr + '/datasets')
app.use(users.routes(), users.allowedMethods())
app.use(datasources.routes(), datasources.allowedMethods())
app.use(datasets.routes(), datasets.allowedMethods())


app.use(history({
    verbose: false,
    rewrites: [{
        from: /^\/$/,
        to: function (context) {
            if (context.request.session.user_id) {
                return '/jumptobase.html';
            } else {
                return '/index.html'
            }
        }
    }, {
        from: /^\/logout$/,
        to: function (context) {
            if (context.request.session.user_id) {
                context.request.session.user_id = null;
            }
            return '/jumptoindex.html'
        }
    }, {
        from: /\/base([^.]+|$)/,
        to: function (context) {
            if (context.request.session.user_id) {
                return '/base.html';
            } else {
                return '/jumptoindex.html'
            }
        }
    }, {
        from: /^\/signup_info$/,
        to: function (context) {
            if (context.request.session.user_id) {
                return '/signup_info.html';
            } else {
                return '/jumptoindex.html'
            }
        }
    }, {
        from: /^[^.]+$/,
        to: function (context) {
            if (context.request.session.user_id) {
                return '/jumptobase.html';
            } else {
                return '/jumptoindex.html'
            }
        }
    }]
}));

//开发环境使用webpack编译和热加载插件

if (app.env == 'development') {
    const logger = require('koa-logger')
    app.use(logger())

    const webpackDevConf = require('./build/webpack.dev.conf');
    app.use(middleware({
        config: webpackDevConf,
        dev: {
            stats: { //打出日志的颜色
                colors: true
            }
        }
    }));
} else {
    // const webpackPrdConf = require('./build/webpack.prod.conf');
    // app.use(middleware({
    //   config: webpackPrdConf,
    //   dev: {
    //     stats: { //打出日志的颜色
    //       colors: true
    //     }
    //   }
    // }));

    // const koaStatic = require('koa-static');
    // app.use(koaStatic(__dirname + '/static'));

    const staticCache = require('koa-static-cache')
    app.use(staticCache(__dirname + '/static', {
        maxAge: 365 * 24 * 60 * 60
    }))
}

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app