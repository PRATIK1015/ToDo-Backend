import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo Management API",
      version: "1.0.0",
      description: "API documentation for the Todo Management system. This API allows users to register, manage their todos (create, update, delete), and track completion status with support for due dates and soft deletion.",
    },
    
    servers: [
      {
        url: `${process.env.SWAGGER_BASE_PATH}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional but recommended
      },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis:["./app/routes/authRoutes.ts","./app/routes/todoRoutes.ts"]
};

const swaggerSpecs = swaggerJsDoc(options);

export default swaggerSpecs;
