const index = (req, res) => {
    res.render('menu/index.ejs');
};

const breakfast = (req, res) => {
    res.render('menu/breakfast.ejs');
};

const lunch = (req, res) => {
    res.render('menu/lunch.ejs');
};

const dinner = (req, res) => {
    res.render('menu/dinner.ejs');
};

const snack = (req, res) => {
    res.render('menu/snack.ejs');
};

module.exports = {
    index,
    breakfast,
    lunch,
    dinner,
    snack,
};