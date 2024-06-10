import "dotenv/config";

export namespace config {
    export type Address = {
        SERVER_HOST: string,
        SERVER_PORT: number,
        CLIENT_HOST: string,
        CLIENT_PORT: number,
    };

    export const address = (): Address => ({
        SERVER_HOST: process.env.SERVER_HOST ? process.env.SERVER_HOST : "::",
        SERVER_PORT: parseInt(process.env.SERVER_PORT ? process.env.SERVER_PORT : "60000"),
        CLIENT_HOST: process.env.CLIENT_HOST ? process.env.CLIENT_HOST : "::",
        CLIENT_PORT: parseInt(process.env.CLIENT_PORT ? process.env.CLIENT_PORT : "60001")
    });
}