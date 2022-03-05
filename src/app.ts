import express, { Application } from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import contraseña from './passport'

import route from './routes'

class Server {
    app: Application
    port: string

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'
        this.middlewares()
        this.routes()
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
        // Passport
        this.app.use(passport.initialize())
        passport.use(contraseña)
    }
    routes() {
        this.app.use('/api', route)
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`\nServidor corriendo en el puerto: ${ chalk.yellow (this.port) } ⚡\n`)
        })
    }
}

export default Server
