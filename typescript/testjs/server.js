const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.send('Bienvenido al servidor WebSocket');

    ws.on('message', (message) => {
        console.log(`Recibido: ${message}`);
        ws.send(`Eco: ${message}`);
    });
});

console.log('Servidor WebSocket en ws://localhost:3000');