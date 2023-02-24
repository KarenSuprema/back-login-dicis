//importar
const { date } = require('@hapi/joi/lib/template')
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
        max:255
    },
    apaterno: {
        type: String,
        required: true,
        max:255
    },
    amaterno: {
        type: String,
        required: true,
        max:255
    },
    email: {
        type: String,
        required: true, 
        max:255
    },
    password: {
        type: String,
        required: true,
        min:6
    },
    date: {
            type: Date,
            //Agrega la fecha y hora actual por defecto
            default: Date.now
    }
        })
        module.exports = mongoose.model('user', userSchema)