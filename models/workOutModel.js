const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workOutSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    reps: {
        type:String,
        required:true
    },
    load:{
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Workout', workOutSchema)
