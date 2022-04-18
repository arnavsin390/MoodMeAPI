const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['routes/routes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Restaurant API",
        description: "Documentation for Restaurant API Getters"
    },
    host: "localhost:3000",
    basePath: "/api",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: ["Get Operations"],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        }
    },
    definitions: {
        page: {
            Page_Number: 1
        },
        limit:{
            Number_Of_Entries: 10
        },
        name:{
            Restauraunt_Name: "Riviera Caterer"
        },
        cuisine:{
            Cuisine: "American"
        },
        resid:{
            Restaurant_ID: "40356018"
        },
        street:{
            Street: "Brunos On The Boulevard"
        },
        grade:{
            Grade: "A"
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})