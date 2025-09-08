/*const readline = require("readline");

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

(async () => {
  const name = await ask("Cuál es tu nombre? ");
  console.log(`Hola, ${name}!`);
})();



const miPromesa = new Promise((resolve, reject) => {
  // simulamos una operación asíncrona con setTimeout
  setTimeout(() => {
    const exito = false;

    if (exito) {
      resolve("Operación completada con éxito");
    } else {
      reject("Hubo un error");
    }
  }, 1000);
});

(async () => {
  try {
    const resultado = await miPromesa;
    console.log("Resultado:", resultado);
  } catch (error) {
    console.error("Error:", error);
  }
})();*/