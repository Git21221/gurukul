import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ASTRON api documentation",
      version: "1.0.0",
      description:
        "API Documentation for ASTRON projects. Here all APIs are defined.",
    },
    components: {
      schemas: {
        Post: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Post ID", example: "672e1d743017e76e2219367c" },
            title: { type: "string", description: "Post title", example: "My Updated Post" },
            visibility: { type: "string", description: "Visibility", example: "public" },
            image: { type: "string", description: "Image URL", example: "https://example.com/image.jpg" },
            isEdited: { type: "boolean", description: "Post edited", example: true },
            user_id: { type: "string", description: "User ID", example: "user123" },
          },
          required: ["_id", "title", "visibility"],
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Development server and test backend",
      },
    ],
  },
  apis: ["src/routes/*.route.js", "src/app.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerDefinition);