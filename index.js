require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workOutRoutes = require('./routes/workouts')


// express app
const app = express() 

//middleware 
app.use(express.json())  
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//Routes
app.use('/api/workouts' , workOutRoutes)

// Connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {   
        //list for Request
    app.listen(PORT, () => {
        console.log(`Connected to database & Listening at Port ${PORT} ! `);
    })
    })
    .catch((error) => {
        console.log(error) 
    })

const PORT = process.env.PORT || 4000;  

module.exports = app