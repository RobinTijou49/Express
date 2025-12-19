const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API TP-API",
      version: "1.0.0",
      description: "Documentation des API du projet",
    },
    servers: [
      {
        url: "http://localhost:3000/tp-api/api",
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger lira toutes les routes pour générer la doc
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/tp-api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
