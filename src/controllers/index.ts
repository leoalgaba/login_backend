import { Request, Response } from 'express'
import User, { IUser } from "../models/user"
import jwt from 'jsonwebtoken'
import config from '../config'

// R E G I S T R A R S E
export const signUp = async (req: Request, res: Response): Promise<Response> => {

    // Comprobar si falta email o contraseña
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Por favor introduzca su email y contraseña'
        })
    }

    // Validacion del email
    const re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if(!re.exec(req.body.email)){
            return res.status(400).json({msg: 'El email no es valido'})
        }

    // Comprobar si el email existe
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({msg: 'El usuario existe'})
    }

    // Grabamos usuario
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json(newUser)
    
}

// L O G U E A R S E
export const signin = async (req: Request, res: Response) => {
    
    // Comprobar si falta email o contraseña
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Por favor introduzca su email y contraseña'
        })
    }

    // Validacion del email
    const re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if(!re.exec(req.body.email)){
            return res.status(400).json({msg: 'El email no es valido'})
        }

    // Comprobar si existe el usuario
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({ msg: 'El usuario no existe'})
    }

    // Creando el token
    function createToken(user: IUser) {
        return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
            expiresIn: 86400 //expira la contras en un dia aprox.
        })
    }

    // Las contraseñan coinciden
    const coinciden = await user.comparePassword(req.body.password)
        if (coinciden) {
        return res.status(200).json({token: createToken(user)})
        
    }
    // en caso contrario
    return res.status(400).json({
        msg: 'La contraseña es incorrecta'
    })
}

// A U T O R I Z A D O
export const autorizar = (req: Request, res: Response) => {
    res.send('conseguido')
}