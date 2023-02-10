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
        required: true
    },
    passwod: {
        type: String,
        required: true,
        min:6
    },
    date: {
            type: date,
            default: date.now
    }
        })