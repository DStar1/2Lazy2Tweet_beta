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
    // console.log("YOOOOOO" + profile.screen_name);
    res.render("dashboard", {
        // user: user,
        profile: profile,
        name: req.user.name
    });
}
);

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) => {
//     // console.log(req.user);
//     res.render("dashboard", {
//         name: req.user.name
//     });
// }
// );
module.exports = router;

                        // // Set password to hashed
                        // newUser.password = hash;
                        // // Save user
                        // newUser.save()