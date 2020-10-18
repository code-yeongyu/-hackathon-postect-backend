const swaggerDefinition = {
    info: {
        title: 'Postect Backend',
        version: '1.0.0',
        description: 'Backend REST API server',
        contact: {
            name: "YeonGyu Kim",
            email: "code.yeon.gyu@gmail.com",
        },
    },
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [
        { jwt: [] }
    ],
    basePath: '/'
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
};

export default options