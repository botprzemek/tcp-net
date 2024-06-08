import { config } from "../config";
import { createSocket, Socket } from "dgram";

const response: Buffer = Buffer.from("Hello, Client!");

export class Server {
    private readonly socket: Socket;

    constructor() {
        this.socket = createSocket("udp4")
            .on("error", this.error)
            .on("message", this.receive)
            .on("listening", this.listen)
            .bind(config.address().SERVER_PORT, config.address().SERVER_HOST);
    }

    private listen = (): void => {
        console.log(`[ ${config.address().SERVER_HOST}:${config.address().SERVER_PORT} ]: Server started...`);
    };

    private receive = (message: string, request: { port: number, address: string }): void => {
        console.log(`[ ${request.address}:${request.port} ]: ${message}`);

        this.socket.send(response, 0, response.length, request.port, request.address, (err) => {
            if (err) console.error(err);
        });
    }

    private error = (error: Error): void => {
        console.log(`Server error:\n${error.stack}`);
        this.socket.close();
    }
}