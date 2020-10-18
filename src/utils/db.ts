import { username, password, host, port, database, options } from '../config/db'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${database}`, options)

export default sequelize