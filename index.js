//Archivo principal
//Que servidor web se va a usar 'configuracion del servidor'
const express = require('express')
//La BD que se va a usar es moongos
const mongoose = require('mongoose')
//Validacion de los datos de la petición
const bodyParser = require('body-parser')
//Para usar el archivo .env va a tener a toda ala configuracion de visual studio
// require('.dotenv').config()
require('dotenv').config()

const app = express()

//Capturar body 
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


//const { Mongoose, default: mongoose } = require("mongoose");

//Conexiona la base de datos 
const url = `mongodb+srv://SuperKaren:44153246@cluster0.irae5sd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
//`mongodb+srv://SuperKaren:44153246@cluster0.gbiywla.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a la BD'))
  .catch((error) => console.log('Error' + error))

//creacion e importacion de rutas 
//Importacion de rutas 

const authRoutes = require('./routes/auth')

//ruta del middleware
//Crear el intermediario. este va enmedio del back y el front para que no exista conexión directa
//api es la ruta intermediaria

app.use('/api/user', authRoutes)

//
app.get('/', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'funciona bien... creo!!!!'
  })
})
//iniciamos el servidor
const PORT = process.env.PORT || 10000
app.listen(PORT, () =>{
    console.log(`Servidor en puerto: ${PORT}`)
})