const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST || "localhost"
const port = process.env.DB_PORT || "5432"
const database = process.env.DATABASE
const options = { logging: false }

export { username, password, host, port, database, options }