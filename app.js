require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var http = require('http');
const { Server } = require("socket.io");
const setupSwagger = require('./config/swagger');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
const messagesRouter = require('./routes/messages');
const userRouter = require('./routes/user.api');
const courseRouteur = require('./routes/courses');
const categoriesRouter = require('./routes/categories');
const reviewsRouter = require('./routes/reviews');
const enrollementsRouter = require('./routes/enrollments');
const chapterRouteur = require('./routes/chapter');
const certificatesRouter = require('./routes/certificates');
const courseCategoriesRouter = require('./routes/courseCategories');


const db = require('./models');

var app = express();
const server = http.createServer(app);
const io = new Server(server);
//Utilisation du code de chat.js
require('./chat')(io);

// connexion à la base de données

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ DB SQLite connectée');

  } catch (err) {
    console.error('❌ DB erreur', err);
  }
})();


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
app.use(`${basePath}/api/messages`, messagesRouter);
app.use(`${basePath}/api/users`, userRouter);
app.use(`${basePath}/api/courses`, courseRouteur);
app.use(`${basePath}/api/categories`, categoriesRouter);
app.use(`${basePath}/api/reviews`, reviewsRouter);
app.use(`${basePath}/api/enrollments`, enrollementsRouter);
app.use(`${basePath}/api/chapters`, chapterRouteur);
app.use(`${basePath}/api/certificates`, certificatesRouter);
app.use(`${basePath}/api/course-categories`, courseCategoriesRouter);


app.get('/', (req, res) => res.send('API fonctionne ✅'));

// Swagger
setupSwagger(app);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  if (err.status === 404) {
    return res.render('404', { title: 'Page non trouvée' });
  }

  res.render('error');
});

server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}${basePath}`);
});

module.exports = app;
