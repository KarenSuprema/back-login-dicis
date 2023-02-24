//poder manejar rutas
// es el que sabe las rutas para en viar paquetes, las rutas son todos los pack que va a detectar la compu
const router = require('express').Router()
const User = require('../models/User')
//const joi = require('@hapi/joi')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')

//Validacion del modelo
const ValidacionResgistro = Joi.object({
    name: Joi.string().max(255).required(),
    apaterno: Joi.string().max(255).required(),
    amaterno: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

// Crear un tocken para validar
const ValidacionLogin = Joi.object({
    email: Joi.string().max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

const ValidacionUpdate = Joi.object({
    id: Joi.string().max(1024).required(),
    name: Joi.string().max(255).required(),
    apaterno: Joi.string().max(255).required(),
    amaterno: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/register', async(req, res) => {
    const {error} = ValidacionResgistro.validate(req.body)
    if(error){
        return res.sendStatus(400).json({
            error: error.details[0].message
        })
    }

     //validar que el correo sea diferente    
     const existeCorreo = await User.findOne({
        email: req.body.email
    })

    if(existeCorreo){
        return res.status(400).json({
            error:"El correo ya existe"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const contrasenaNueva = await bcrypt.hash(re.body.password, salt )

    //declara una constante que tenga todos los parametros requeridos

    
    const usuario = new User({
        name: req.body.name,
        apaterno: req.body.apaterno,
        amaterno: req.body.amaterno,
        email: req.body.email,
        password: contrasenaNueva
    })
    try{
        const guardado = await usuario.save()
        if(guardado){
            return res.json({
              error: null,
              data: guardado  
            })
        } else{
            return res.json({
                error: "No se pudo guardar "
            })
        }
    } catch(error){
        return res.json({
            error
        })
    }
})

router.post('/login', async(req, res) => {
    const {error} = ValidacionLogin.validate(req.body)
    if(error){
        return res.sendStatus(400).json({
            error: error.details[0].message
        })
    }

     //validar que el correo sea diferente    
     const existeCorreo = await User.findOne({
        email: req.body.email
    })

    if(!existeCorreo){
        return res.status(400).json({
            error:"El correo no encontrado"
        })
    }

    const passwodCorrecto = await bcrypt.compare(req.body,password, existeCorreo.passwod)
    if(!passwodCorrecto){
        return res.status(400).json({
            error:"Las contraseñas no coinciden"
        })
    }

    const token = Jwt.sign({
        name: existeCorreo.name,
        id: existeCorreo._id
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })

})

router.get('"getalluser', async(req, res) =>{
    const users = User.find()
    if(users){
        res.json({
            error: null,
            data: users
        })
    }else {
        res.json({
            error: "No hay usuarios en la BD"
        })
    }

}) 

router.post('/deleteuser', async(req, res) => {
    const id = req.body.id
    const userExist = await User.findById({_id: id})
    if(userExist){
        await User.findByIdAndDelete({_id: id})
        res.json({
            error: null,
            data: 'Usuario Borrado'
        })
    } else {
        res.json({
            error: 'Usuario no encontrado'
        })
    }
})

router.post('/Updateuser', async(req, res) => {
    const {error} = ValidacionUpdate.validate(req.body)
    if(error){
        return res.sendStatus(400).json({
            error: error.details[0].message
        })
    }

     //validar que el correo sea diferente    
     let existeId = await User.findOne({
        _id: req.body.id
    })

    if(!existeId){
        return res.status(400).json({
            error:"El Usuario no existe"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const contrasenaNueva = await bcrypt.hash(re.body.password, salt )
    existeId = {
        id: req.body.id,
        name: req.body.name,
        apaterno: req.body.apaterno,
        amaterno: req.body.amaterno,
        passwod: contrasenaNueva

    }
    existeId.passwod = contrasenaNueva
    try{
        const guardado = await User.findByIdAndUpdate(
            {_id: existeId.id}, 
            existeId,
            {new: true}
        )
        if(guardado){
            return res.json({
              error: null,
              data: guardado  
            })
        } else{
            return res.json({
                error: "No se pudo Actualizar "
            })
        }
    } catch(error){
        return res.json({
            error
        })
    }
})
    module.exports = router 
