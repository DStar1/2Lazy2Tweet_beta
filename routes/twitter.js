const express = require('express');
const router = express.Router();
const OAuth= require('oauth').OAuth;

// '/twitter/' Routes
// router.get('/', (req, res) => {
//     console.log(JSON.stringify(req.session));
//     res.send('Twitter');
// });

router.get('/login', (req, res) => {
    authorize(req, res);
});

router.get('/oauth/callback', (req, res) => {
    authorized(req, res);
});

// router.get('/twitter', (req, res) => {
//    postToTwitter(req, res);
// });

// --- controllers
function createOAuthClient(){
    let consumerToken = require("../config/keys").consumerToken;
    let consumerTokenSecret = require("../config/keys").consumerTokenSecret;
    return new OAuth("https://api.twitter.com/oauth/request_token",
                      "https://api.twitter.com/oauth/access_token",
                      consumerToken,
                      consumerTokenSecret,
                      "1.0",
                      'http://localhost:5000/twitter/oauth/callback',
                      "HMAC-SHA1");
}

function authorize(req, res){
    console.log(JSON.stringify(req.session));
    let oa = createOAuthClient();
    oa.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
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
    let oa = createOAuthClient();
    let oauth_token = req.query.oauth_token;
    let oauth_verifier = req.query.oauth_verifier;
    if( !req.session.oauth ){
        res.redirect('/dashboard');
    }

    oa.getOAuthAccessToken(
        oauth_token, null, oauth_verifier,
        (error, oauth_access_token, oauth_access_token_secret, results2) => {
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
                res.redirect('/dashboard');
            }
    });
}

// function postToTwitter(req, res){
//    console.log(JSON.stringify(req.session));
//    let oa = createOAuthClient();
//    let text = 'foo';
//    console.log(req.session.oauth);
//    if( req.session.oauth && req.session.oauth.oauth_access_token_secret ){
//       let oauth_access_token = req.session.oauth.oauth_access_token;
//       let oauth_access_token_secret = req.session.oauth.oauth_access_token_secret;
//       oa.getProtectedResource(
//          'http://twitter.com/statuses/update.json?status=' + text,
//          "POST", oauth_access_token, oauth_access_token_secret,
//          (error, data, response) => {
//             console.log(JSON.stringify(req.session));
//             if( error ){
//                res.send(error);
//             }else{
//                res.send('ok');
//             }
//          });
//    }else{
//       console.log('oauth session not found');
//       res.redirect('/twitter/login');
//    }
// }

module.exports = router;