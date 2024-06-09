import { createSocket, Socket } from "dgram";
import { config } from "../config";
import zlib from "zlib";

export class Connector {
    protected readonly socket: Socket;

    constructor(host?: string, port?: number) {
        this.socket = createSocket("udp4")
            .on("error", this.error)
            .on("message", this.receive)
            .on("listening", this.listen)
            .bind(
                port ? port : 3000,
                host ? host : "127.0.0.1"
            );
    }

    protected listen = (): void => {
        console.log(`[ ${config.address().SERVER_HOST}:${config.address().SERVER_PORT} ]: Socket started...`);
    };

    protected receive = (message: string, request: { port: number, address: string }): void => {
        zlib.unzip(message, (error: Error | null, buffer: Buffer): void => {
            if (error) {
                console.error("Compressing error:", error);
                return;
            }

            console.log(`[ ${request.address}:${request.port} ]: ${buffer.toString()}`);
        });
    }

    public send = (data: any, host: string, port: number): void => {
        zlib.gzip(data.toString(), (error: Error | null, buffer: Buffer): void => {
            if (error) {
                console.error("Compressing error:", error);
                return;
            }

            this.socket.send(buffer, 0, buffer.length, port, host, (error: Error | null): void => {
                if (error) {
                    console.error(error);
                }
            });
        });
    }

    protected error = (error: Error): void => {
        console.error("Socket error:", error.stack);
        this.socket.close();
    }
}