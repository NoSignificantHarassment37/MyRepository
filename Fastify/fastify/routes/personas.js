/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function personas(fastify, options) {
  const collection = fastify.mongo.db.collection("personas");
  fastify.get("/personas", async function () {
    const personas = collection.find().toArray();
    if (personas.lenght === 0) {
      throw new Error("No se han encontrado personas.");
    }
    return personas;
  });
  const personaBodySchema = {
    type: "object",
  };
  fastify.post("/personas", async function () {});
}

export default personas;
