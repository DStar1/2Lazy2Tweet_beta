const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// Welcome Page
router.get('/', (req, res) => res.render("welcome"));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // const user = undefined;//require('connect-ensure-login').ensureLoggedIn() ? req.user : none;
    const profile = req.app.get('profile');
    const twitter = req.app.get('twitter');
    console.log("\n\n\nTwitter Profile\n");
    console.dir(profile);
    console.log("\n\n\nUser\n");
    console.dir(req.user);
    console.log(req.isAuthenticated());
    // res.json(twitterPosts);
    // console.log("YOOOOOO" + profile.screen_name);
    const loggedIn = typeof(req.session.oauth) != 'undefined' ? req.session.oauth.access_token_results : 0;
    res.render("dashboard", {
        // user: user,
        loggedIn: loggedIn,
        name: req.user.name
    });
}
);


let twitterPosts = [
    {
        date: "Double click to delete",
        post: "An example Post"
    }
];

router.get("/dictionary-api", (req, res) => {
    res.json(twitterPosts);
    console.log("get EVENT!");
});

router.post("/dictionary-api", (req, res) => {
    // Create cron to run backend
    // createCronAutomation(req.body); //Maybe push to firebase first?
    twitterPosts.push(req.body);
    res.json(twitterPosts);
    console.log("EVENT!");
});

// Fix deleting of two of the same datetime objects
router.delete("/dictionary-api/:date", (req, res) => {
    twitterPosts = twitterPosts.filter((post) => {
        return post.date.toLowerCase() !== req.params.date.toLowerCase();
    });
	res.json(twitterPosts);
});




module.exports = router;

                        // // Set password to hashed
                        // newUser.password = hash;
                        // // Save user
                        // newUser.save()

        function createCronAutomation(body) {
            let min = body.date.substring(14, 16);
            let hour = body.date.substring(11, 13);
            let day = body.date.substring(8, 10);
            let mon = body.date.substring(5, 7);
            let year = body.date.substring(0, 4);
        
            let dateTimeCronFormat = min + " " + hour + " " + day + " " + mon + " *";// "* * * * *"
            // console.log(dateTimeCronFormat, '\n', year, mon, day, hour, min);
            console.log('Sending Tweet on ' + body.date + '\nPost: \'' + body.post + '\'');
            let mediaPath = "";
            let post = '\'' + body.post + '\'';
            let token = '\'' + '1125629520596234241-ThOpOFCgdjvFVASI6wqRUxl6CFfJlh' + '\'';//ha_test
            let tokenSecret =  '\'' + 'mnhvraTofTXs8GsNANlyx216BXKBKc7jx8oFgs4mmfUNH' + '\'';//ha_test
            // tweet.sendTweet(body.post);
            // console.log('Sending Tweet on ' + body.date + '\nPost: \'' + body.post + '\'');
            cron.schedule(dateTimeCronFormat, function() {
        
                // Runs node script
                const exec = require('child_process').exec;
                function puts(error, stdout, stderr) { console.log(stdout); }
                exec("node twitterPost.js " + token + ' ' + tokenSecret + ' ' + post + mediaPath, puts);
        
                // console.log("IN CRON: ");
                // console.log('Sending Tweet on ' + body.date + '\nPost: \'' + body.post + '\'');
                // tweet.sendTweet(body.post);
            });
        }
        