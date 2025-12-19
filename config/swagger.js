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
        url: process.env.BASE_URL || "http://localhost:3000/tp-api/api",
      },
    ],
    components: {
      schemas: {
        Chapter: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            course_id: { type: 'integer', example: 2 },
            title: { type: 'string', example: 'Introduction' },
            duration: { type: 'integer', example: 120 }
          }
        },
        Course: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Cours Express' },
            price: { type: 'number', example: 19.99 },
            instructor_id: { type: 'integer', example: 5 }
          }
        },
        CourseCategory: {
          type: 'object',
          properties: {
            course_id: { type: 'integer', example: 1 },
            category_id: { type: 'integer', example: 2 }
          }
        },
        Enrollment: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 2 },
            course_id: { type: 'integer', example: 3 },
            date: { type: 'string', format: 'date-time', example: '2025-12-19T12:34:56Z' }
          }
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 2 },
            course_id: { type: 'integer', example: 3 },
            rating: { type: 'integer', example: 5 },
            comment: { type: 'string', example: 'Très bon cours' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Robin' },
            email: { type: 'string', example: 'robin@example.com' },
            role: { type: 'string', example: 'admin' }
          }
        },
        Message: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            message: { type: 'string', example: 'Salut !' },
            room: { type: 'string', example: 'general' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-12-19T12:34:56Z' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            label: { type: 'string', example: 'Informatique' }
          }
        },
        Certificate: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            enrollment_id: { type: 'integer', example: 2 },
            issue_date: { type: 'string', format: 'date', example: '2025-12-19' },
            serial_number: { type: 'string', example: 'ABC123' }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"], // Swagger lira toutes les routes pour générer la doc
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/tp-api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
