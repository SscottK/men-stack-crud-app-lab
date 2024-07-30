const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    model: { type: String, required: true },
    make: { type: String, required: true },
    isElectric: { type: Boolean, required: true }
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car