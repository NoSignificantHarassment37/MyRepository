import 'dotenv/config'
import { createClient } from 'redis';

const modo = false; // true = run benchmark, false = clean benchmark
const host = true; // true = localhost, false = cloud
const client = host ? createClient({
  url: 'redis://127.0.0.1:6379/0'
}): createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
async function cleanBenchmarkKeys() {
  await client.connect();

  let cursor = '0';
  let totalDeleted = 0;

  do {
    const result = await client.scan(cursor, {
      MATCH: 'key:*',
      COUNT: 1000
    });

    cursor = result.cursor;
    const keys = result.keys;

    if (keys.length > 0) {
      await client.del(keys);
      totalDeleted += keys.length;
    }

  } while (cursor !== '0');

  console.log(`✅ ${totalDeleted} keys del benchmark eliminadas`);
  await client.quit();
}


const NUM_KEYS = 1_000_000;

async function runBenchmark() {
  await client.connect();
  console.log(`🔹 Conectado a Redis Cloud, empezando benchmark con ${NUM_KEYS} keys...`);

  // SET secuencial
  const startSet = Date.now();
  for (let i = 0; i < NUM_KEYS; i++) {
    await client.set(`key:${i}`, `value:${i}`);
  }
  const endSet = Date.now();
  console.log(`✅ SET completado en ${(endSet - startSet)} ms`);

  // GET secuencial
  const startGet = Date.now();
  for (let i = 0; i < NUM_KEYS; i++) {
    await client.get(`key:${i}`);
  }
  const endGet = Date.now();
  console.log(`✅ GET completado en ${(endGet - startGet)} ms`);

  await client.quit();
}


if (modo) {
  runBenchmark().catch(err => {
    console.error('❌ Error en benchmark:', err);
    client.quit();
  });
}
else {
  cleanBenchmarkKeys().catch(err => {
    console.error('❌ Error borrando keys:', err);
    client.quit();
  });
}