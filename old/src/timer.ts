import { Bus } from "./bus";
import { getQuarterAmount, getQuarterLength } from "./config";

export class Timer {
    bus: Bus;
    id: number | NodeJS.Timeout;
    milliseconds: number = 0;
    quarter: number = 0;

    constructor(bus: Bus) {
        this.bus = bus;
        this.id = 0;
        this.milliseconds = getQuarterLength();
        this.quarter = 1;
    }

    run = (): void => {
        if (this.milliseconds !== 0) {
            this.milliseconds -= 10;
            this.bus.emit("update_timer", this.format());
            this.bus.emit("update_quarter", this.quarter);
            return;
        }

        this.stop();
        this.next();
    }

    start = (): void => {
        this.id = setInterval(this.run, 10);
    }

    toggle = (): void => {
        if (this.id) {
            this.stop();
            return;
        }

        this.start();
    }

    next = (): void => {
        if (this.quarter >= getQuarterAmount()) {
            return;
        }

        this.quarter++;
        this.milliseconds = getQuarterLength();

        // Test
        this.toggle();
    }

    stop = (): void => {
        clearInterval(this.id);
        this.id = 0;
    }

    format = (): string[] => [
        String(Math.floor(this.milliseconds / 60000)).padStart(2, "0"),
        String(Math.floor((this.milliseconds % 60000) / 1000)).padStart(2, "0"),
        String(this.milliseconds % 1000).padStart(3, "0")
    ]
}