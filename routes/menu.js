const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu');

router.get('/', (req, res) => {
    res.render('menu/index.ejs');
});

router.get('/breakfast', (req, res) => {
    res.render('menu/breakfast.ejs');
});

router.get('/lunch', (req, res) => {
    res.render('menu/lunch.ejs');
});

router.get('/dinner', (req, res) => {
    res.render('menu/dinner.ejs');
});

router.get('/snack', (req, res) => {
    res.render('menu/snack.ejs');
});



module.exports = router;