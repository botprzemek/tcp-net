declare namespace config {
    export type Address = {
        SERVER_HOST: string,
        SERVER_PORT: number,
        CLIENT_HOST: string,
        CLIENT_PORT: number,
    };

    export function address(): Address;
}