/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("animals");
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
  const userSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      username: { type: "string" },
      email: { type: "string" },
      age: { type: "integer" },
      isActive: { type: "boolean" },
      score: { type: "number" },
      createdAt: { type: "string", format: "date-time" },
    },
    required: [
      "_id",
      "username",
      "email",
      "age",
      "isActive",
      "score",
      "createdAt",
    ],
  };

  const opts = {
    schema: {
      response: {
        200: {
          type: "array",
          items: userSchema,
        },
      },
    },
  };

  fastify.get("/users", opts, async (req, reply) => {
    const users = await collection.find().toArray();
    if (users.lenght === 0) {
      throw new Error("No hay usuarios");
    }
    return users;
  });

  fastify.get("/animals/:animal", async (request, reply) => {
    const result = await collection.findOne({ animal: request.params.animal });
    if (!result) {
      throw new Error("Invalid value");
    }
    return result;
  });

  const animalBodyJsonSchema = {
    type: "object",
    properties: {
      animal: { type: "string" },
    },
    required: ["animal"],
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  fastify.post("/animals", { schema }, async (request, reply) => {
    // we can use the `request.body` object to get the data sent by the client
    const result = await collection.insertOne({ animal: request.body.animal });
    return result;
  });
}

export default routes;
