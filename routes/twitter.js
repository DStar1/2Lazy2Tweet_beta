const express = require("express");
const router = express.Router();
const passportTwit = require('passport');

// Define routes.
router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login',
  function(req, res){
    console.log('ENV');
    console.log(process.env);
    console.log('Headers:');
    console.log(req.headers)
    res.render('twitter-login');
  });

router.get('/login/twitter',
  passportTwit.authenticate('twitter'));

router.get('/oauth/callback',
  passportTwit.authenticate('twitter', { failureRedirect: '/twitter' }),
  function(req, res) {
    res.redirect('/twitter');
  });

router.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    // console.log("TOKENS");
    // console.dir(req.user);
    // console.log(auth.token);
    // console.log(auth.tokenSecret);
    res.redirect('/dashboard');
    // res.render('dashboard', { user: req.user });
  });

  module.exports = router;