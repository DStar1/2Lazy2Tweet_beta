const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const { ensureAuthenticated } = require("./config/auth");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require('node-cron');

var trustProxy = false;
if (process.env.DYNO) {
  // Apps on heroku are behind a trusted proxy
  trustProxy = true;
}

const app = express();

// Passport config
require("./config/passport")(passport);

// DB Config
const db = process.env.MONGO_URI;
// const db = require("./config/keys").MongoURI; //non Heroku

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Mongo DB Conected..."))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
// app.use(require('body-parser').urlencoded({ extended: true }));// Need?
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

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// // Not sure?
app.use(express.static("./views"));
// app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});
app.use(cors());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// app.use('/upload', require('./routes/upload'));
app.use('/twitter', ensureAuthenticated, require('./routes/twitter'));

app.get('/auth', (req, res) => {
  // console.dir(req.session);
  let twit = (typeof(req.session.oauth) === 'undefined') ? 0 : req.session.oauth.access_token_results.screen_name;
  console.dir(req.session.oauth);
  // console.dir({
  //   "name":req.user.name,
  //   "email":req.user.email,
  //   "twitter": twit
  // });
  if (typeof req.session.passport !== 'undefined') {
    res.json({
      "name":req.user.name,
      "email":req.user.email,
      "twitter": twit
    });
    // res.json(req.session.passport.user);
  }
  else
    res.json(req.session.passport.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

