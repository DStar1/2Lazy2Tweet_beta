const express = require("express");
const cron = require('node-cron');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const { ensureAuthenticated } = require("../config/auth");

// User model
const User = require('../models/User');

let twitterPosts = [
    {
        date: Date.now(),
        post: "An example Post"
    }
];

// Welcome Page
router.get('/', (req, res) => res.render("welcome"));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    ////// res.json(twitterPosts);
    // req.session.username = req.user;
    console.dir(req.session);
    res.redirect("http://localhost:3000");
    // res.redirect("/api/posts");


    // // // const user = undefined;//require('connect-ensure-login').ensureLoggedIn() ? req.user : none;
    // // const profile = req.app.get('profile');
    // // const twitter = req.app.get('twitter');
    // // console.log("\n\n\nTwitter Profile\n");
    // // console.dir(profile);
    // // console.log("\n\n\nUser\n");
    // // console.dir(req.user);
    // // console.log(req.isAuthenticated());
    // // // res.json(twitterPosts);
    // // // console.log("YOOOOOO" + profile.screen_name);
    // const loggedIn = typeof(req.session.oauth) != 'undefined' ? req.session.oauth.access_token_results : 0;
    // // res.redirect("http://localhost:3000");///////// FOR FRONTEND ROUTING
    // console.dir(req.user.email);
    // res.render("dashboard", {
    //     // user: user,
    //     loggedIn: loggedIn,
    //     name: req.user.name
    // });
    // // res.json(twitterPosts);
});


router.get("/api/posts", ensureAuthenticated, (req, res) => {
    // const loggedIn = typeof(req.session.oauth) != 'undefined' ? req.session.oauth.access_token_results : 0;
    // // res.redirect("http://localhost:3000");///////// FOR FRONTEND ROUTING
    // // console.dir(req.user.email);
    // res.render("dashboard", {
    //     // user: user,
    //     loggedIn: loggedIn,
    //     name: req.user.name
    // });

    // Validation pass
    User.findOne( {email: req.user.email} )
    .then(user => {
        if (user) {
            // User exists
            console.log("USER IS ONLINE AS", user.name);
            // res.json(twitterPosts);//mongoDB posts
            res.json(user.posts);//mongoDB posts
            // console.log("ERROR?");
        } else {
            console.log("NO USER!");
        }

    })
    .catch(err => {console.log(err); res.redirect("/login");});
});

router.post("/api/posts", ensureAuthenticated, (req, res) => {
    // Create cron to run backend
    // createCronAutomation(req.body); //Maybe push to firebase first?
    // twitterPosts.push(req.body);
    // res.json(twitterPosts);

    // let data = {
    //     dateToPost: req.body.dateToPost,
    //     posted: 0,
    //     post: req.body.post
    // }

    // User.findOne( {email: req.user.email} )
    console.log("\n\n\n\n\n\nMEDIA\n\n\n\n\n\n\n")
    console.dir(req.body.files);
    console.dir(req.body);
    User.findOne( {email: req.user.email} )
    .then(user => {
        if (user) {

            // Trying to handle image data
            let form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
              console.dir(fields);
              let oldpath = files.filetoupload.path;
              console.log(oldpath);
              let newpath = '/nfs/2017/h/hasmith' + files.filetoupload.name;
              console.log("\n\nPATHHHHHHSSSSS\n\n", oldpath, " -> ", newpath);
            // //   let newpath = 'C:/Users/hasmith/' + files.filetoupload.name;
            //   fs.rename(oldpath, newpath, function (err) {
            //     if (err) throw err;
            //     res.write('File uploaded and moved!');
            //     res.end();
            //   });
            });

            // User exists
            console.log("USER", user.name, "IS ADDING", req.body, "TO DB.");
            // Create cron to run backend
            // createCronAutomation(req.body, req.session.oauth); //Maybe push to firebase first?
            let twit = (typeof(req.session.oauth) === 'undefined') ? "NO_USER>" : req.session.oauth.access_token_results.screen_name;
            let data = {
                dateToPost: req.body.dateToPost,
                twitter: twit,
                posted: 0,
                post: req.body.post
            }
            console.log(data);
            user.posts.push(data);

            user.save();

            // twitterPosts.push(req.body);// Push to db
            // res.json(twitterPosts);

            res.json(user.posts);
            // console.log("EVENT!");

        } else {
            console.log("NO USER!");
        }

    })
    .catch(err => console.log(err));
});

// Fix deleting of two of the same datetime objects
router.delete("/api/posts/:date", ensureAuthenticated, (req, res) => {
    twitterPosts = twitterPosts.filter((post) => {
        return post.date.toLowerCase() !== req.params.date.toLowerCase();
    });
	res.json(twitterPosts);
});


// router.get("/dictionary-api", ensureAuthenticated, (req, res) => {



//     // // Validation pass
//     // User.findOne( {email: req.user.email} )
//     // .then(user => {
//     //     if (user) {
//     //         // User exists
//     //         console.log("USER IS ONLINE AS", user.name);
//     //         // res.json(twitterPosts);//mongoDB posts
//     //         // console.log("ERROR?");
//     //     } else {
//     //         console.log("NO USER!");
//     //     }

//     // })
//     // .catch(err => console.log(err));

//     // const loggedIn = 1;//typeof(req.session.oauth) != 'undefined' ? req.session.oauth.access_token_results : 0;
//     // // res.redirect("http://localhost:3000");///////// FOR FRONTEND ROUTING
//     // // console.dir(req.user.email);
//     // res.render("dashboard", {
//     //     // user: user,
//     //     loggedIn: loggedIn,
//     //     name: req.user.name
//     // });
//     // // console.dir(req.user.email);
//     // // res.json(twitterPosts);
//     // // console.log("get EVENT!");

//     res.json(twitterPosts);//mongoDB posts

// });

// router.post("/dictionary-api", ensureAuthenticated, (req, res) => {
//     console.log("IN POSTING");
//     // // Validation pass
//     // User.findOne( {email: req.user.email} )
//     // .then(user => {
//     //     if (user) {
//     //         // User exists
//     //         console.log("USER", user.name, "IS ADDING", req.body, "TO DB.");
//     //         // Create cron to run backend
//     //         // createCronAutomation(req.body); //Maybe push to firebase first?
//     //         twitterPosts.push(req.body);// Push to db
//     //         // res.json(twitterPosts);
//     //         console.log("EVENT!");

//     //     } else {
//     //         console.log("NO USER!");
//     //     }

//     // })
//     // .catch(err => console.log(err));
//     console.log("FINISHED POSTING!!");
//     res.json(twitterPosts);
// });

// // Fix deleting of two of the same datetime objects
// router.delete("/dictionary-api/:date", ensureAuthenticated, (req, res) => {
//     twitterPosts = twitterPosts.filter((post) => {
//         return post.date.toLowerCase() !== req.params.date.toLowerCase();
//     });
// 	res.json(twitterPosts);
// });




module.exports = router;

                        // // Set password to hashed
                        // newUser.password = hash;
                        // // Save user
                        // newUser.save()

function createCronAutomation(body, oauth) {
    let utcDate1 = new Date(Date.parse(body.dateToPost));
    // console.log(utcDate1.hour());
    let min = utcDate1.getMinutes();
    let hour = utcDate1.getHours();
    let day = utcDate1.getUTCDate();
    let mon = utcDate1.getUTCMonth() + 1;
    let year = utcDate1.getUTCFullYear();
    // let min = body.dateToPost.substring(14, 16);
    // let hour = body.dateToPost.substring(11, 13);
    // let day = body.dateToPost.substring(8, 10);
    // let mon = body.dateToPost.substring(5, 7);
    // let year = body.dateToPost.substring(0, 4);

    let dateTimeCronFormat = min + " " + hour + " " + day + " " + mon + " *";// "* * * * *"
    console.log(dateTimeCronFormat, '\n', year, mon, day, hour, min);
    console.log('Sending Tweet on ' + body.dateToPost + '\nPost: \'' + body.post + '\'');
    let mediaPath = "";
    let post = '\'' + body.post + '\'';
    let token = '\'' + oauth.oauth_access_token + '\'';//ha_test
    let tokenSecret =  '\'' + oauth.oauth_access_token_secret + '\'';//ha_test
    // let token = '\'' + '1125629520596234241-ThOpOFCgdjvFVASI6wqRUxl6CFfJlh' + '\'';//ha_test
    // let tokenSecret =  '\'' + 'mnhvraTofTXs8GsNANlyx216BXKBKc7jx8oFgs4mmfUNH' + '\'';//ha_test
    // tweet.sendTweet(body.post);
    let cronString = "node twitterPost.js " + token + ' ' + tokenSecret + ' ' + post + mediaPath;
    console.log(cronString);
    // console.log('Sending Tweet on ' + body.dateToPost + '\nPost: \'' + body.post + '\'');
    cron.schedule(cronString, function() {

        // Runs node script
        const exec = require('child_process').exec;
        function puts(error, stdout, stderr) { console.log(stdout); }
        // console.log(cronString);
        exec(cronString, puts);

        // console.log("IN CRON: ");
        // console.log('Sending Tweet on ' + body.dateToPost + '\nPost: \'' + body.post + '\'');
        // tweet.sendTweet(body.post);
    });
}
