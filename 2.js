const WebSocket = require('ws');
const port = process.env.PORT || 8080; 

const wss = new WebSocket.Server({ port: port }, () => {
    console.log(`Server WebSocket aktif di port ${port}`);
});

wss.on('connection', function connection(ws) {
    console.log('Client Roblox terhubung.');

    ws.on('message', function incoming(message) {
        const msgString = message.toString();
        
        // Broadcast skrip dari Anda ke SEMUA client executor yang terhubung
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msgString);
            }
        });
    });
});
