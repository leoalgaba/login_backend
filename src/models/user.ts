import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
    id: string
    email: string
    password: string
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    // usuario nuevo
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})

// Comparar contraseñas
userSchema.methods.comparePassword = async function (
    password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser> ('User',userSchema)

