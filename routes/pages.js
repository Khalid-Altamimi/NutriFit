const express = require('express');
const router = express.Router();

const isSignedIn = require('../middleware/is-signed-in');


router.get('/fittrack', isSignedIn, (req, res) => {
    res.render('pages/fittrack.ejs');
});

router.get('/profile', isSignedIn, (req, res) => {
    res.render('pages/profile.ejs');
});

module.exports = router;