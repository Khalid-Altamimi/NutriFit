const Workout = require('../models/workout');

const index = async (req, res) => {
    try {
        const workouts = await Workout.find({
            user: req.session.user._id,
        }).sort({date: -1});

        const totalWorkouts = workouts.length;

        const totalCaloriesBurned = workouts.reduce(
            (sum, workout) => sum + workout.caloriesBurned,
            0
        );
        res.render('workouts/index.ejs' , {
            workouts,
            totalWorkouts,
            totalCaloriesBurned,
        });
    } catch (error) {
        res.status(500).send('Error loading workouts');
    }
};

const newWorkout = (req, res) => {
    res.render('workouts/new.ejs');
};

const create = async (req, res) => {
    try {
        await Workout.create({
            name: req.body.name,
            duration: req.body.duration,
            caloriesBurned: req.body.caloriesBurned,
            date: req.body.date,
            user: req.session.user._id,
        });
        res.redirect('/workouts');
    } catch (err) {
        res.status(400).send('Error creating workout');
    }
};


const show = async (req, res) => {
    try {
        const workout = await Workout.findOne({
         _id: req.params.id,
        user: req.session.user._id,
        });

        if (!workout) return res.redirect('/workouts');

        res.render('workouts/show.ejs', { workout });
    } catch (err) {
        res.status(400).send(' Workout not found');
    }
};



const edit = async (req, res) => {
    try {
        const workout = await Workout.findOne({
            _id: req.params.id, 
            user: req.session.user._id,
        });

        if (!workout) return res.redirect('/workouts');

        res.render('workouts/edit.ejs' , { workout });
    } catch (err) { 
        res.status(400).send(' Workout not found');
    }
};


const update = async (req, res) => {
    try {
        await Workout.findOneAndUpdate(
            {_id: req.params.id, user: req.session.user._id},
            {
                name: req.body.name,
                duration: req.body.duration,
                caloriesBurned: req.body.caloriesBurned,
            },
            { new: true }
        );
        res.redirect('/workouts');
     } catch (err) {
        res.status(400).send(' Error updating workout');
    }
};



const destroy = async (req, res) => {
    try {
        await Workout.findOneAndDelete({
            _id: req.params.id, 
            user: req.session.user._id
        });
        res.redirect('/workouts' );
    } catch (error) {
        res.status(400).send(' Error deleting workout');
    }
};


module.exports = {
    index,
    new: newWorkout,
    create,
    show,
    edit,
    update,
    destroy,
};