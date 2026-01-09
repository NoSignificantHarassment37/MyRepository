import { MongoClient } from "mongodb";

// ===== CONFIGURACIÓN =====
const MONGO_URI =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.10";
const DB_NAME = "fastify";
const COLLECTION_NAME = "animals";
const DOCUMENTS_TO_INSERT = 10_000; // cambia esto sin miedo

// ===== GENERADOR SIMPLE =====
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[randomInt(0, chars.length - 1)];
  }
  return result;
}

function generateDocument() {
  return {
    username: randomString(8),
    email: `${randomString(6)}@example.com`,
    age: randomInt(18, 70),
    isActive: Math.random() > 0.5,
    score: Math.random() * 100,
    createdAt: new Date(),
  };
}

// ===== MAIN =====
async function seed() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const docs = [];
    for (let i = 0; i < DOCUMENTS_TO_INSERT; i++) {
      docs.push(generateDocument());
    }

    console.time("insertMany");
    const result = await collection.insertMany(docs);
    console.timeEnd("insertMany");

    console.log(`📦 Insertados ${result.insertedCount} documentos`);
  } catch (err) {
    console.error("💥 Error:", err);
  } finally {
    await client.close();
  }
}

seed();
