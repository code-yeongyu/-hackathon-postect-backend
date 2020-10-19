import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import sequelize from '../utils/db'

let userSchema = {
    pk: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const User = sequelize.define('User', userSchema)
User.prototype.createPassword = async (password: string) => {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
}
User.prototype.comparePassword = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}
export default User