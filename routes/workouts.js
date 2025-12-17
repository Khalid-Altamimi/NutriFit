const express = require('express');
const router = express.Router();

const workoutsController = require('../controllers/workouts');
const isSignedIn = require('../middleware/is-signed-in');


router.use(isSignedIn);

router.get('/', workoutsController.index);
router.get('/new', workoutsController.new);
router.post('/', workoutsController.create);
router.get('/:id/edit', workoutsController.edit);
router.put('/:id', workoutsController.update);
router.delete('/:id', workoutsController.destroy);


module.exports = router;


