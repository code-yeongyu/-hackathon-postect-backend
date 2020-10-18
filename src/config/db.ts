import { Sequelize } from 'sequelize'

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST || "localhost"
const port = process.env.DB_PORT || "5432"
const database = process.env.DATABASE

const sequelize: Sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${database}`, { logging: false })

export default sequelize