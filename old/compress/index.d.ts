declare namespace compress {
    export function from(data: string): Buffer;
    export function to(data: Buffer): string;
}