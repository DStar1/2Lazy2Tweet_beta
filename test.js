// const express = require("express");
const twitterAPI = require('node-twitter-api');

// const app = express();

// var twitter = new twitterAPI({
//     consumerKey: 'lLf9ItWtOThN4hSLT8A5jfQ4p',//process.env['TWITTER_CONSUMER_KEY'],
//     consumerSecret: 'Nowgar22QppjjiHGEjgfpBh5D3tCMX2jwoTsF0qDTkzoU147zk',//process.env['TWITTER_CONSUMER_SECRET'],
//     callbackURL: 'http://localhost:8080/oauth/callback'//'https://github.com/DStar1/2Lazy2Tweet',//'/oauth/callback',
// });

// auth = {
//     requestToken: '',
//     requestTokenSecret: '',
//     authURL: ''
// }
// app.get('/', (req, res) => {
//     twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
//         if (error) {
//             console.log("Error getting OAuth request token : " + error);
//         } else {
//             //store token and tokenSecret somewhere, you'll need them later; redirect user
//             auth.requestToken = requestToken;
//             auth.requestTokenSecret = requestTokenSecret;
//             console.log("requestTokens");
//             console.log(auth.requestToken);
//             console.log(auth.requestTokenSecret);
//             /// redirect url
//             auth.URL = twitter.getAuthUrl(auth.requestToken);
//             console.log(auth.URL);
//             res.redirect(auth.URL);
//         }
//     });
// });

// app.get('/oauth/callback', function(req, res) {
//     console.log(req.query);
//     console.dir(req.query);
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
// // twitter.getAccessToken(auth.requestToken, auth.requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
// // 	if (error) {
// // 		console.log(error);
// // 	} else {
// // 		//store accessToken and accessTokenSecret somewhere (associated to the user)
// //         //Step 4: Verify Credentials belongs here
// //         console.log(accessToken);
// //         console.log(accessTokenSecret);
// // 	}
// // });
/**
 * node.js/express twitter oauth integration sample
 */

var express = require('express'),
    connect = require('connect'),
    session = require("express-session");
// var MemoryStore = require('connect/middleware/session/memory');
var OAuth= require('oauth').OAuth;

var app = express();

// Configuration

   app.set('views', __dirname + '/views');
// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
//    app.use(connect.logger({ format: ':method :url' }));
//    app.use(connect.cookieDecoder());
//    app.use(connect.session({ store: new MemoryStore({ reapInterval: 60000 * 10 }) })),
//    app.use(connect.bodyDecoder());
//    app.use(connect.methodOverride());
//    app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
//    app.use(app.Router());
//    app.use(connect.staticProvider(__dirname + '/public'));


// app.configure('development', function(){
//    app.use(connect.errorHandler({ dumpExceptions: true, showStack: true }));
// });

// app.configure('production', function(){
//    app.use(connect.errorHandler());
// });
// Routes

app.get('/', function(req, res){
   console.log(JSON.stringify(req.session));
   res.send('dummy');
});

app.get('/login', function(req, res){
   authorize(req, res);
});

app.get('/authorized', function(req, res){
    // console.log(req.query);
    // // console.dir(req.query);

   authorized(req, res);
});

app.get('/twitter', function(req, res){
   postToTwitter(req, res);
});



app.listen(3000);


// --- controllers
function createOAuthClient(){
   return new OAuth("https://api.twitter.com/oauth/request_token",
                    "https://api.twitter.com/oauth/access_token",
                    'lLf9ItWtOThN4hSLT8A5jfQ4p',
                    'Nowgar22QppjjiHGEjgfpBh5D3tCMX2jwoTsF0qDTkzoU147zk',
                    "1.0",
                    'http://localhost:3000/authorized',
                    "HMAC-SHA1");
}

function authorize(req, res){
   console.log(JSON.stringify(req.session));
   var oa = createOAuthClient();
   oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
      console.log(error);
      if(error) {
         res.writeHead(500, {'Content-Type': 'text/html'});
         res.send('error :' + error);
      }else {
         req.session.oauth = {
            oauth_token: oauth_token,
            oauth_token_secret: oauth_token_secret,
            request_token_results: results
         };
         console.log(JSON.stringify(req.session));
         res.redirect('http://twitter.com/oauth/authorize?oauth_token=' + oauth_token);
      }
   });
}

// authorized callback from twitter.com
function authorized(req, res){
   var oa = createOAuthClient();
   var oauth_token = req.query.oauth_token;
   var oauth_verifier = req.query.oauth_verifier;
   if( !req.session.oauth ){
      res.redirect('/'); // invalid callback url access;
   }

   oa.getOAuthAccessToken(
      oauth_token, null, oauth_verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results2) {
         console.log(JSON.stringify(req.session));
         if(error){
            console.log(error);
            res.send(error);
         }else{
            console.log('oauth_access_token :' + oauth_access_token);
            console.log('oauth_access_token_secret :' + oauth_access_token_secret);
            console.log('accesstoken results :' + JSON.stringify(results2));
            req.session.oauth.oauth_access_token = oauth_access_token;
            req.session.oauth.oauth_access_token_secret = oauth_access_token_secret;
            req.session.oauth.access_token_results = results2;
            console.log(JSON.stringify(req.session));
            res.redirect('/twitter');
         }
      });
}

function postToTwitter(req, res){
   console.log(JSON.stringify(req.session));
   var oa = createOAuthClient();
   var text = 'foo';
   console.log(req.session.oauth);
   if( req.session.oauth && req.session.oauth.oauth_access_token_secret ){
      var oauth_access_token = req.session.oauth.oauth_access_token;
      var oauth_access_token_secret = req.session.oauth.oauth_access_token_secret;
      oa.getProtectedResource(
         'http://twitter.com/statuses/update.json?status=' + text,
         "POST", oauth_access_token, oauth_access_token_secret,
         function (error, data, response) {
            console.log(JSON.stringify(req.session));
            if( error ){
               res.send(error);
            }else{
               res.send('ok');
            }
         });
   }else{
      console.log('oauth session not found');
      res.redirect('/login');
   }
}