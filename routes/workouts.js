const express = require('express')
const {createWorkout, getWorkouts, singlegetWorkouts,deleteWorkout,updateWorkout} = require('../controllers/workoutController')

const router = express.Router()

//Get all workouts
router.get('/', getWorkouts)

//Get a single workout
router.get('/:id', singlegetWorkouts )

//POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout )

// UPDATE a workout 
router.patch('/:id', updateWorkout)

module.exports = router