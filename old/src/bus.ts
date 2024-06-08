import { Listener, Method } from "./listener";

export class Bus extends Listener {
    readonly id: number;

    constructor(id: number) {
        super();

        this.id = id;
    }

    on(event: string, listeners: Method[]): void {
        this.add(event, listeners);
    }

    off(event: string, listener: Method): void {
        this.set(event, this.get(event).filter((l: Method): boolean => l !== listener));
    }

    emit(event: string, data?: any): void {
        this.get(event).forEach((listener: Method) => listener(data));
    }
}