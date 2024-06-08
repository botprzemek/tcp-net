export type Method = (data?: any) => void

export class Listener {
    private readonly listeners: {
        [event: string]: Method[],
    }

    constructor() {
        this.listeners = {};
    }

    add(event: string, listeners: Method[]): void {
        if (!this.listeners[event]) {
            this.clear(event);
        }

        this.listeners[event] = this.listeners[event].concat(listeners);
    }

    set(event: string, listeners: Method[]): void {
        if (!this.listeners[event]) {
            this.clear(event);
        }

        this.listeners[event] = listeners;
    }

    get(event: string): Method[] {
        return this.listeners[event] ? this.listeners[event] : [];
    }

    clear(event: string): void {
        this.listeners[event] = [];
    }
}