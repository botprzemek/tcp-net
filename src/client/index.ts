import * as net from 'net';

const PORT = 8080;
const HOST = '127.0.0.1';

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('Connected to server');

    // Send a simple payload to the server
    client.write('Hello, server! This is client.');
});

client.on('data', (data) => {
    console.log('Received from server:', data.toString());

    // Close the connection after receiving the response
    client.destroy();
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Client error:', err);
});
