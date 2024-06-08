import { Socket } from "dgram";

export declare class Server {
    private readonly socket: Socket;

    constructor();

    private listen(): void;
    private receive(message: string, rinfo: { port: number; address: string }): void;
    private error(error: Error): void;
}
