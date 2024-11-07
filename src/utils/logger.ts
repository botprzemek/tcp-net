export class Logger {
    private readonly format: string;

    constructor(format: string) {
        this.format = format;
    }

    protected log(...parameters: Array<string | number | Error>) {
        console.log(this.format, ...parameters);
    }
}