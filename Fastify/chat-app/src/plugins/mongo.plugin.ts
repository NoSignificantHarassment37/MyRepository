// ESM
import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify: FastifyInstance, options) {
  fastify.register(fastifyMongo, {
    forceClose: true,
    url: "mongodb://127.0.0.1:27017/fastify?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.10",
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector);
