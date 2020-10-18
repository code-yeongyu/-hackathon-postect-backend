import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

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

class User extends Model { }
User.init(userSchema, { sequelize, modelName: 'User' })
export default User