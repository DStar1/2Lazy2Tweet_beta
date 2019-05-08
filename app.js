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
// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passportTwit.use(new Strategy({
		consumerKey: 'lLf9ItWtOThN4hSLT8A5jfQ4p',//process.env['TWITTER_CONSUMER_KEY'],
		consumerSecret: 'Nowgar22QppjjiHGEjgfpBh5D3tCMX2jwoTsF0qDTkzoU147zk',//process.env['TWITTER_CONSUMER_SECRET'],
		callbackURL: '/twitter/oauth/callback',//'https://github.com/DStar1/2Lazy2Tweet',//'/oauth/callback',
        proxy: trustProxy
  },
  function(token, tokenSecret, profile, cb) {
    // console.log(profile);
    app.set('token', token);
    app.set('tokenSecret', tokenSecret);
    app.set('profile', profile);
    // auth.token = token;
    // auth.tokenSecret = tokenSecret;

    // console.log("TOKENS");
    console.log("\n\n\nPROFILE\n" + profile + "\n\n\n\n");
    // console.log(app.get('token'));
    // console.log(app.get('tokenSecret'));


    // console.log("TOKENS");
    // console.log(auth.token);
    // console.log(auth.tokenSecret);
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure PassportTwit authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, PassportTwit needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passportTwit.serializeUser(function(user, cb) {
  cb(null, user);
});

passportTwit.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
/////



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











