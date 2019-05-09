const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
/////
require('dotenv').config()
const passportTwit = require('passport');
const Strategy = require('passport-twitter').Strategy;

var trustProxy = false;
if (process.env.DYNO) {
  // Apps on heroku are behind a trusted proxy
  trustProxy = true;
}

const app = express();
// app.set('token', '');
// app.set('tokenSecret', '');
let auth = {
    token: '',
    tokenSecret: ''
}




// Passport config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Mongo DB Conected..."))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Passport twitter
// // Create a new Express application.
// var app = express();

// // Configure view engine to render EJS templates.
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize PassportTwit and restore authentication state, if any, from the
// session.
// app.use(passportTwit.initialize());
// app.use(passportTwit.session());




// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    // res.locals.token = '';
    // res.locals.tokenSecret = '';
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/twitter', require('./routes/twitter'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

// Special thanks:
// https://www.youtube.com/watch?v=6FOq4cUdH8k











