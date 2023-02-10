//poder manejar rutas
// es el que sabe las rutas para en viar paquetes, las rutas son todos los pack que va a detectar la compu
const router = require('express').Router()
const User = require('../models/User')
const joi = require('@hapi/joi')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')

const salt = await bcrypt.genSalt(10)
const contrasenaNueva = await bcrypt.hash(re.body.password, salt )

const ValidacionResgistro = Joi.object({
    name: Joi.string().max(255).require(),
    apaterno: Joi.string().max(255).require(),
    amaterno: Joi.string().max(255).require(),
    email: Joi.string().max(255).require(),
    password: contrasenaNueva
})
router.post('/register', async(req, res) => {
    const{error} = ValidacionResgistro.validate(req.body)
    if(error){
        return res.status(400).json({
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
    try {
        const guardado = await usuario.save()
        if(guardado) {
            return res.json({
                error: null,
                data: guardado
            })
        } else{
            return res.json[{
                error: "No se pudo guardar"
            }]
        }
    } catch(error){
        console.log(error)
        //para ver el error
           return res.json({
            error
           })
    }
})

const passwodCorrecto = await bcrypt.compare(req.body,password, existeCorreo.password)
if(!passwodCorrecto){
    return res.status(400).json({
        error:"Las contraseñas no coinciden"
    })
}

const token = Jwt.sign({
    name: existeCorreo.name,
    id: existeCorreo._id
}, 'clave')

res.header('auth-token', token).json({
    error: null,
    data: {token}
})
module.exports = router


router.get('/getallusers', async(req, res)=>{
    if(users){
        res.json({
            error: null,
            data: users
        }) else{
            res.json({
                res.json({
                    error: "No hay usuarios en la BD"
                })
            })
        }
    }
})

//Borrar un usuario de la BD
router.post('/deleteuser', async(req, res) => {
    const id = req.body.id
    const userExist = await user.findById(_id)
    if(userExist){
        await User.findByIdAndDelete(_id)
        res.json({
            error: null,
            data: users   
        })else{
            res.json({
                error: "Usuario no encontrado"
            })
        }
     }
    
})

