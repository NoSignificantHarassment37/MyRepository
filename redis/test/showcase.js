import { createClient } from "redis"
import crypto from "crypto";

const client = createClient({
    url:'redis://127.0.0.1:6379/0'
});

const ALGORITHM = "aes-256-gcm";
const KEY = crypto.randomBytes(32); // 256 bits
console.log(KEY);
await client.connect();
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

async function create(){
    await client.set('hola!', '1');
    await client.set('hola2!', '2');
    await client.set('hola3!', '3');
    await client.set('hola4!','4');
    await client.hSet('obj', {

    })
}
async function read(){
    const value = await client.get('hola!');
    const values = await client.mGet(['hola2!', 'hola3!', 'hola4!']);
    console.log(value);
    console.log(values);
}
async function patch(){
    await client.set('hola!','10');
    console.log('Nuevo valor de "hola!":10');
    await client.set('hola2!', '20');
    console.log('Nuevo valor de "hola2!":20');
}
async function deleteKey(){
    await client.del('hola!');
    await client.del('hola2!');
    await client.del('hola3!');
    await client.del('hola4!');
}
try{
    console.log('CREANDO...');
    await create();
    console.log('LEYENDO...');
    await read();
    console.log('EDITANDO...');
    await patch();
    console.log('ELIMINANDO...');
    await deleteKey();
}
catch(e){
    console.log('ha ocurrido un error.', e);
}
finally {
    await client.quit()
}