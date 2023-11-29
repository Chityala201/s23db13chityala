const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connection to DB succeeded');
});

const cereal = require('./models/cerealSchema');
const Account = require('./models/account');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cerealRouter = require('./routes/cereal');
const boardRouter = require('./routes/board');
const chooseRouter = require('./routes/choose');
const resourceRouter = require('./routes/resource');


const app = express();

// Passport configuration

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        console.log("User:", user); // Add this line
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        user.authenticate(password, function (err, isValid) {
          if (err) {
            return done(err);
          }

          if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          console.log("Authentication successful"); // Add this line
          return done(null, user);
        });
      })
      .catch(function (err) {
        return done(err);
      });
  }
));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);
app.use('/cereal', cerealRouter);


// Database seeding logic
async function recreateDB() {
  // Delete everything
  await cereal.deleteMany();

  // Seed new data
  const instances = [
    { cerealBrandName: "Kellogg's", cerealFlavor: 'Blue Berries', price: 5.8 },
    { cerealBrandName: 'Grains', cerealFlavor: 'Peanut', price: 7.8 },
    { cerealBrandName: 'Lucky chance', cerealFlavor: 'Vanila', price: 6.8 }
  ];

  for (const instance of instances) {
    const newCereal = new cereal(instance);
    try {
      await newCereal.save();
      console.log(`Object saved: ${JSON.stringify(instance)}`);
    } catch (err) {
      console.error(err);
    }
  }
}

const reseed = true;
if (reseed) {
  recreateDB();
}

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
