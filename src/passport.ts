import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from './config'
import User from './models/user'

// Opciones de estrategia
const opciones: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

// Estrategia contraseña
export default new Strategy(opciones, async (payload, done) => {
    try {
        // Hay un usuario que cumple el payload
        const user = await User.findById(payload.id)
        if (user) {
            return done(null,user)
        }
        // No hay usuario que cumpla el payload
        return done(null, false)
    } catch (error) {
        console.log(error)
    }
})
