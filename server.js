require('dotenv').config()
const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const Note = require('./models/car')
const logger = require('morgan')
const Car = require('./models/car')
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
app.post('/cars', async (req, res) => {
    req.body.isElectric === 'on' || req.body.isElectric === true? 
    req.body.isElectric = true : 
    req.body.isElectric= false
    try {
        const createdCar =  await Note.create(req.body)
        res.status(301).redirect(`/notes/${createdCar._id}`)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message })
        
    }
})

app.get('/notes/new', (req, res) => {
    res.render('new.ejs')
})

//READ

app.get('/cars', async (req, res) => {
    try {
        const foundCars = await Car.find({})
        res.render('index.ejs', {
            notes: foundCars
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


//UPDAAATE


//SHOW


//DELETE





app.listen(PORT, () => { console.log('I see connected apps' + ` application accepting requests on PORT ${PORT}`) })