import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import models from './models'
import routes from './routes'
import sequelize from './config/db'

models.forEach((model) => {
    model.sync()
})
sequelize.sync()

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(morgan('combined'))

routes.forEach((route) => {
    app.use(route)
})

app.listen()