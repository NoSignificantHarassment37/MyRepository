import 'dotenv/config'
import { createClient } from "redis"
import crypto from "crypto";

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

let running = true;

process.on("SIGINT", () => {
  console.log('"CTRL + C" recibido, saliendo del programa...');
  running = false;
});

console.readline = async (question) => {
  const rl = readline.createInterface({ input, output });
  rl.on('SIGINT', () => {
    rl.close();
  });
  try {
    const answer = await rl.question(question);
    return answer;
  }
  catch(e){
    console.error(e);
  }
  finally {
    rl.close();
  }
};

const client = createClient({
    url:'redis://127.0.0.1:6379/0'
});

const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.SECRET_KEY, "hex");
await client.connect();
/**
 * 
 * @param {string} text - cadena de texto a cifrar
 * @returns {{iv:string, content:string, tag:string}}
 */
function encrypt(text) {
  const iv = crypto.randomBytes(12); // recomendado para GCM
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
    tag: tag.toString("hex")
  };
}
/**
 * 
 * @param {{iv:string, content:string, tag:string}} payload  - objeto completo 
 * @returns {string} - resultado de la desencriptación
 */
function decrypt(payload) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(payload.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(payload.tag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.content, "hex")),
    decipher.final()
  ]);

  return decrypted.toString("utf8");
}

try {
  // await client.set('dato-cifrado', JSON.stringify(encrypt("Michael! help me! Michael!!!!!!")));
  // const jsonPayload = await client.get('dato-cifrado');
  // const result = decrypt(JSON.parse(jsonPayload));
  // console.log(result);
  let email;
  while(running) {
    email = await console.readline('Cuál es tu email?\n');
    console.log(`Según entendí, tu email es: ${email}. Es correcto? [y/n]`);
    const confirmacion = await console.readline('');
    if(confirmacion === 'y'){
      break;
    }
    else if (confirmacion === 'n'){
      console.log('Vale, volvamos a intentarlo.\n');
    }
    else {
      console.log('Por favor introduce solo "y" o "n".');
    }
    console.log(running);
  }
  console.log('bucle finalizado');
}
catch(e){
  console.log('ha ocurrido un error.', e);
}
finally {
  await client.quit()
}