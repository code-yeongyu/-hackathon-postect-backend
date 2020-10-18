import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { ModelList as models } from './models'
import routes from './routes'
import sequelize from './utils/db'
import swaggerOptions from './config/swagger'
import { ErrorType, errorMessages } from './errors'

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

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/custom-errors', (req: express.Request, res: express.Response) => {
    res.json({
        "errorTypes": ErrorType,
        "errorMessages": errorMessages
    })
})
app.use(bodyParser.json())
app.use(morgan('combined'))


app.use('', routes)

app.listen(process.env.PORT || 3000)