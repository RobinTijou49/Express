var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var http = require('http');
const { Server } = require("socket.io");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();
const server = http.createServer(app);
const io = new Server(server);
//Utilisation du code dans chat.js
require('./chat')(io);

const port = process.env.PORT || 3000;
const basePath = "/tp-api";


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(basePath, express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mon-secret',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

app.use(`${basePath}/`, indexRouter);
app.use(`${basePath}/users`, usersRouter);
app.use(`${basePath}/login`, loginRouter);
app.use(`${basePath}/logout`, logoutRouter);


/**********************
 * 404
 **********************/
app.use(function(req, res, next) {
  next(createError(404));
});

/**********************
 * ERROR HANDLER
 **********************/
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  if (err.status === 404) {
    return res.render('404', { title: 'Page non trouvée' });
  }

  res.render('error');
});

/**********************
 * SERVER START
 **********************/
server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}${basePath}`);
});

module.exports = app;
