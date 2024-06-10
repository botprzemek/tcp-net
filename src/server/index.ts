import { config } from "../config";
import { Logger } from "../logger";
import { createServer, AddressInfo, Server as TCPServer, Socket } from "net";
import zlib from "zlib";

export class Server extends Logger {
    private readonly server: TCPServer;

    constructor(host?: string, port?: number) {
        super("[ %s:%s ]: %s");

        this.server = createServer((socket: Socket) => {
            socket.on("connect", () => console.log("Test 1"))
            socket.on("connection", () => console.log("Test 2"))
            socket.on("connectionAttempt", () => console.log("Test 3"))
            socket.on("data", this.receive);
            socket.on("error", this.error);
            socket.on("close", this.close);
        })
        .listen(
            port ?? config.address().SERVER_PORT,
            host ?? config.address().SERVER_HOST,
            this.listen
        );
    }

    protected listen = (): void => {
        const { address, port } = this.server.address() as AddressInfo;
        this.log(address, port, "Server started...");
    };

    protected connection = (socket: Socket): void => {
        this.log("Client connected", `${socket}`);
    }

    protected receive = (data: Buffer): void => {
        zlib.unzip(data, (error: Error | null, buffer: Buffer): void => {
            if (error) {
                const { address, port } = this.server.address() as AddressInfo;
                this.log(address, port, error);

                return;
            }

            const { address, port } = this.server.address() as AddressInfo;
            this.log(address, port, buffer.toString());
        });
    }

    public send = (host: string, port: number, data: any): void => {
        const socket: Socket = new Socket();
        
        socket.connect(port, host, () => {
            zlib.gzip(data.toString(), (error: Error | null, buffer: Buffer): void => {
                if (error) {
                    const { address, port } = this.server.address() as AddressInfo;
                    this.log(address, port, buffer.toString());
                    socket.end();

                    return;
                }

                socket.write(buffer, (error: Error | undefined): void => {
                    if (error) {
                        const { address, port } = this.server.address() as AddressInfo;
                        this.log(address, port, buffer.toString());
                    }

                    socket.end();
                });
            });
        });

        socket.on("error", (error: Error): void => {
            const { address, port } = this.server.address() as AddressInfo;
            this.log(address, port, error);

            socket.end();
        });
    }

    protected close = () => {
        const { address, port } = this.server.address() as AddressInfo;
        this.log(address, port, "Client Disconnected");
    }

    protected error = (error: Error): void => {
        if (this.server) {
            this.server.close();
        }

        console.log(`[ ]: ${error.stack}`);
    }
}