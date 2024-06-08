import { config } from "../config";
import { createSocket, Socket } from "dgram";
import * as zlib from "zlib";

const response: Buffer = Buffer.from('Hello, Server!');

export class Client {
    private readonly socket: Socket;

    constructor() {
        this.socket = createSocket("udp4")
            .on("error", this.error)
            .on("message", this.receive)
            .bind(config.address().CLIENT_PORT, config.address().CLIENT_HOST);

        console.log(`[ ${config.address().CLIENT_HOST}:${config.address().CLIENT_PORT} ]: Client started...`);

        // this.socket.send(response, 0, response.length, config.address().SERVER_PORT, config.address().SERVER_HOST, (err) => {
        //     if (err) console.error(err);
        // });
        zlib.gzip(response, (err, compressedData) => {
            if (err) {
                console.error("Error compressing data:", err);
                return;
            }
            // Send the compressed data
            this.socket.send(compressedData, 0, compressedData.length, config.address().SERVER_PORT, config.address().SERVER_HOST, (err) => {
                if (err) console.error(err);
            });
        });
    }

    private receive = (message: Buffer, request: { port: number, address: string }): void => {
        console.log(`[ ${request.address}:${request.port} ]: ${message}`);
    }

    private error = (error: Error): void => {
        console.log(`Client error:\n${error.stack}`);
        this.socket.close();
    }
}