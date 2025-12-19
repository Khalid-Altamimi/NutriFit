const Meal = require('../models/meal');

const index = async (req, res) => {
    try {
        const meals = await Meal.find({user: req.session.user._id}).sort({createdAt: -1});
        const totalMeals = meals.length;

        const totalCalories = meals.reduce(
            (sum, meal) => sum + (meal.calories || 0),
            0
        );

        res.render('meals/index.ejs' , { meals, totalMeals, totalCalories });
    } catch (error) {
        res.status(500).send('Error fetching meals');
    }
};


const newMeal = async (req, res) => {
    res.render('meals/new.ejs');
};



const create = async (req, res) => {
    try {
        await Meal.create({
            name: req.body.name,
            type: req.body.type,
            calories: req.body.calories,
            user: req.session.user._id,
        });
        res.redirect('/meals');
    } catch (error) {
        res.status(400).send('Error creating meal');
    }
};

const show = async (req, res) => {
    try {
        const meal = await Meal.findOne({_id: req.params.id, user: req.session.user._id});
        if (!meal) return res.redirect('/meals');
        res.render('meals/show.ejs', {meal});
    } catch (error) {
        res.status(400).send('meal not found');
    }
};


const edit = async (req, res) => {
    try {
        const meal = await Meal.findOne({_id: req.params.id, user: req.session.user._id});
        if (!meal) return res.redirect('/meals');
        res.render('meals/edit.ejs', {meal});
    } catch (error) {
        res.status(400).send('meal not found');
    }
};


const update = async (req, res) => {
    try {
        await Meal.findOneAndUpdate(
            { _id: req.params.id, user: req.session.user._id},
            { name: req.body.name, type: req.body.type, calories: req.body.calories}
        );
        res.redirect('/meals');
    } catch (error) {
        res.status(400).send('Error updating meal');
    }
};


const destroy = async (req, res) => {
    try {
        await Meal.findOneAndDelete({ _id: req.params.id, user: req.session.user._id});    
        res.redirect('/meals');
    } catch (error) {
        res.status(400).send('Error deleting meal');
    }
};


module.exports = {
    index,
    new: newMeal,
    create,
    show,
    edit,
    update,
    destroy,
};
