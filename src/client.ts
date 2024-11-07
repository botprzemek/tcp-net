import { connect, createConnection, Socket } from "net";
import zlib from "zlib";

export class Client {
    private readonly client: Socket;

    constructor() {
        this.client = new Socket()
            .on("data", this.receive)
            .on("error", this.error)
            .on("close", this.close);
    }

    public send = (data: any, host: string, port: number): void => {
        this.client.connect(port, host, () => {
            console.log(`Connected to server at ${host}:${port}`);
        });

        zlib.gzip(data.toString(), (error: Error | null, buffer: Buffer): void => {
            if (error) {
                console.error(`Error compressing data: ${error}`);
                this.client.end();
                return;
            }

            this.client.write(buffer, (error: Error | undefined): void => {
                if (error) {
                    console.error(`Error sending data: ${error}`);
                }
            });
        });
    }

    protected receive = (data: Buffer): void => {
        zlib.unzip(data, (error: Error | null, buffer: Buffer): void => {
            if (error) {
                console.error(`Error uncompressing data: ${error}`);
                return;
            }

            console.log(`Received: ${buffer.toString()}`);
        });
    }

    protected close = (): void => {
        console.log("Connection closed");
    }

    protected error = (error: Error): void => {
        console.error(`Socket error: ${error}`);
        this.client.end();
    }
}
