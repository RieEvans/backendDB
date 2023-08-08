const Workout = require("../models/workOutModel")
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout
const singlegetWorkouts = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such ID Exist'})
    } 
    const workout = await Workout.findById(id)
    if(!workout) {
        return res.status(404).json({error:'No Such workout'})
    }
    res.status(200).json(workout)
}

//create new workout

const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please Fill in all the Fields', emptyFields})
    }
    
    // add doc to the db 
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json(({error: 'ID Not Exist cannot be Delete'}))
     }
     const workout = await Workout.findOneAndDelete({_id: id})
     if(!workout) {
        return res.status(404).json({error:'No Such Workout'})
     }
     res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
    if(!workout){
        return res.status(400).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    singlegetWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}