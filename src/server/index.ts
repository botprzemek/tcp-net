import { createServer, Server, Socket } from 'net';
import * as zlib from 'zlib';

const PORT: number = 8080;
const HOST: string = "127.0.0.1";

const server: Server = createServer((socket: Socket): void => {
    console.log('Client connected:', socket.remoteAddress, socket.remotePort);

    socket.on('data', (data: Buffer): void => {
        let message

        zlib.gzip(data, (error: Error | null, result: Buffer): void => {
            if (!error) {
                message = result.toString();
            }
            console.error(error);
        });

        console.log('Received:', message);

        // Echo the message back to the client
        socket.write(`Send: Hello`);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
