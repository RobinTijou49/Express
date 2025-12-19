require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const http = require('http');
const { Server } = require("socket.io");

// Passport Google
const passport = require('./config/passport-google');

// Swagger
const setupSwagger = require('./config/swagger');

// Database
const db = require('./models');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Chat
require('./chat')(io);

// Connexion DB
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

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Statics
app.use(basePath, express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Session + Passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Variables pour views
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

// --- ROUTES GOOGLE OAUTH ---

// Routes Google
app.get(`${basePath}/auth/google`,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(`${basePath}/auth/google/callback`,
  passport.authenticate('google', { failureRedirect: `${basePath}/login` }),
  (req, res) => {
    res.redirect(`${basePath}/profile`);
  }
);

// --- Logout ---
app.get(`${basePath}/logout`, (req, res) => {
  req.logout(() => {
    res.redirect(basePath);
  });
});
// Middleware pour protéger une route
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(`${basePath}/login`);
}

// --- Exemple route protégée ---
app.get(`${basePath}/profile`, ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

// --- ROUTES DE L’API ---
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const messagesRouter = require('./routes/messages');
const userRouter = require('./routes/user.api');
const courseRouteur = require('./routes/courses');
const categoriesRouter = require('./routes/categories');
const reviewsRouter = require('./routes/reviews');
const enrollementsRouter = require('./routes/enrollments');
const chapterRouteur = require('./routes/chapter');
const certificatesRouter = require('./routes/certificates');
const courseCategoriesRouter = require('./routes/courseCategories');

// Utilisation des routes
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

// Test home
app.get('/', (req, res) => res.send('API fonctionne ✅'));

// Swagger
setupSwagger(app);

// 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if (err.status === 404) {
    return res.render('404', { title: 'Page non trouvée' });
  }
  res.render('error');
});

// Serveur
server.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}${basePath}`);
});

module.exports = app;
