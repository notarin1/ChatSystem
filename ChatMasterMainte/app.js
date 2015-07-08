/* http://qiita.com/naga3/items/e63144e17cb1ab9e03e9 */

/*
 * npm のライブラリは、下記パスに配置される。
 * C:\Users\notar_000\node_modules
 * Windowsのコマンドラインからnpmを使うこと。cygwinからではダメ。
 * 
 */

var debug = require('debug')('app4');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var userinfo = require('./routes/userinfo');
var login = require('./routes/login');
var logout = require('./routes/logout');

var app = express();

// Sessionの準備(app.use(app.router);の前に行う必要がある)
var session = require('express-session');
var MongoStore = require('connect-mongo')({ session: session });
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    store: new MongoStore({
        db: 'session',
        host: 'localhost',
        clear_interval: 60 * 60
    }),
    cookie: {
        httpOnly: false,
        maxAge: new Date(Date.now() + 60 * 60 * 1000)
    },
    resave: true,
    saveUninitialized: true
}));


// view engine setup
app.set('port', process.env.PORT || 3000);		// ポート番号
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// アクセスされるルートごとの描画コード
app.use('/', routes);
app.use('/users', users);   // ユーザ一覧＋ユーザ編集
app.use('/login', login);
app.use('/logout', logout);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found '+ req);
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
