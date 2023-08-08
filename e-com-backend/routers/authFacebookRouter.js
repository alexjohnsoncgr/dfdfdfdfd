const router = require('express').Router();
const passport = require('passport');
require('../config/authFacebookConfig');



//(When user click the button)
router.route('/')
    .get(passport.authenticate("facebook", { scope: "email" }))

//  (When facebook redirect)
router.route('/redirect')
    .get(passport.authenticate("facebook", { session: false }), (req, res) => {
        // return res.status(200).send(req.user); //user is a by default attribute
        // res.sendFile(path.join(__basedir, "public/loginSuccess.html"));
        if (req.user) {
            res.writeHead(301, {
                Location: `http://localhost:3000/sociallogin/${req.user.token}`
            }).end();
        } else {
            res.writeHead(400, {
                Location: `http://localhost:3000/login`
            }).end();
        }
    })

module.exports = router;