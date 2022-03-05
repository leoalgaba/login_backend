export default {
    // JWT
    jwtSecret: process.env.JWT_SECRET || '1234',
    // Base de datos
    DB: {
        URI: process.env.MONGODB__URI || 'mongodb://localhost/login',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}
