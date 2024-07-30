require('dotenv').config()
const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const Note = require('./models/note')
const logger = require('morgan')
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))//we are ablt to parse the body and accept urlencoded data which is the default form data
app.use(logger('tiny'))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('Connection with mongo is established')
})

mongoose.connection.on('error', () => {
    console.error('Mongo is trippin')
})


//CONTROLLER AND ROUTER LOGIG

//CREATE

//READ


//UPDAAATE


//SHOW


//DELETE