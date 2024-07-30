require('dotenv').config()
const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
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
        const createdCar =  await Car.create(req.body)
        res.status(301).redirect(`/cars/${createdCar._id}`)
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message })
        
    }
})

app.get('/cars/new', (req, res) => {
    res.render('new.ejs')
})

//READ
//Index
app.get('/cars', async (req, res) => {
    try {
        const foundCars = await Car.find({})
        res.render('index.ejs', {
            cars: foundCars
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

//Show
app.get('/cars/:id', async (req, res) => {
    try {
        const foundCar = await Car.findOne({ _id: req.params.id})
        res.render('show.ejs', {
            car: foundCar
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })  
    }
})



//UPDATE

app.get('/cars/:id/edit', async (req, res) => {
    const foundCar = await Car.findOne({ _id: req.params.id})
    res.render('edit.ejs', {
        car: foundCar
    })
})

app.put('/cars/:id', async (req, res) => {
    req.body.isElectric === 'on' || req.body.isElectric === true? 
    req.body.isElectric = true : 
    req.body.isElectric= false
    try {
        const updatedCar = await Car.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })// new: true sends the updated version
        res.status(301).redirect(`/cars/${updatedCar._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})



//DELETE

app.delete('/cars/:id', async (req, res) => {
    try {
        await Car.findOneAndDelete({ _id: req.params.id })
        .then((car) => {
            res.sendstatus(204)
        })        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

app.get('/cars/:id', async (req, res) => {
    try {
        const foundCar = await Car.findOne({ _id: req.params.id})
        res.render('show.ejs', {
            car: foundCar
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })  
    }
})




app.listen(PORT, () => { console.log('I see connected apps' + ` application accepting requests on PORT ${PORT}`) })