import { Router } from 'express'
import { signin, signUp, autorizar } from '../controllers'
import passport from 'passport'

const router = Router()

// Registrarse
router.post('/signup', signUp)

// Loguearse
router.post('/signin', signin)

router.get('/autorizado', passport.authenticate('jwt', {
    session: false
}), autorizar)

export default router
