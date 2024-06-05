import { getQuarterAmount, getQuarterLength } from "./config.js";

export class Timer {
    milliseconds = 0;
    quarter = 0;
    timer = null;

    constructor() {
        this.quarter = 1;
        this.milliseconds = getQuarterLength();

        const [ minutes, seconds, milliseconds ] = this.format();
        this.set(document.querySelector(".timer .minutes"), minutes);
        this.set(document.querySelector(".timer .seconds"), seconds);
        this.set(document.querySelector(".timer .milliseconds"), milliseconds);
        this.set(document.querySelector(".quarter .number"), this.quarter);
        this.set(document.querySelector(".timer .control"), "Start Clock");

        document.querySelector(".timer .control").removeAttribute("disabled");

        document.querySelector(".timer .control").addEventListener("click", () => {
            this.toggle();
        });

        document.querySelector(".timer .minutes_up").addEventListener("click", () => {
            this.milliseconds += 60000;

            const [ minutes, seconds, milliseconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
            this.set(document.querySelector(".timer .milliseconds"), milliseconds);
        });

        document.querySelector(".timer .minutes_down").addEventListener("click", () => {
            this.milliseconds -= 60000;

            const [ minutes, seconds, milliseconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
            this.set(document.querySelector(".timer .milliseconds"), milliseconds);
        });

        document.querySelector(".timer .seconds_up").addEventListener("click", () => {
            this.milliseconds += 1000;

            const [ minutes, seconds, milliseconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
            this.set(document.querySelector(".timer .milliseconds"), milliseconds);
        });

        document.querySelector(".timer .seconds_down").addEventListener("click", () => {
            this.milliseconds -= 1000;

            const [ minutes, seconds, milliseconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
            this.set(document.querySelector(".timer .milliseconds"), milliseconds);
        });
    }

    run = () => {
        if (this.milliseconds !== 0) {
            this.milliseconds -= 10;

            const [ minutes, seconds, milliseconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
            this.set(document.querySelector(".timer .milliseconds"), milliseconds);

            return;
        }

        this.stop();
        this.next();
    };
    get = (element) => {
        return parseInt(element.innerText);
    };
    set = (element, value) => {
        if (!element) {
            return;
        }
        
        element.innerText = value;
    };
    start = () => {
        const [ minutes, seconds, milliseconds ] = this.format();
        this.set(document.querySelector(".timer .minutes"), minutes);
        this.set(document.querySelector(".timer .seconds"), seconds);
        this.set(document.querySelector(".timer .milliseconds"), milliseconds);

        this.timer = setInterval(this.run, 10);
    };
    toggle = () => {
        if (this.timer !== null) {
            this.stop();
            this.set(document.querySelector(".timer .control"), "Start Clock");

            return;
        }

        this.start();
        this.set(document.querySelector(".timer .control"), "Stop Clock");
    };
    next = () => {
        if (this.quarter >= getQuarterAmount()) {
            return;
        }
        
        this.quarter++;
        this.set(document.querySelector(".quarter .number"), this.quarter);

        this.milliseconds = getQuarterLength();

        const [ minutes, seconds, milliseconds ] = this.format();
        this.set(document.querySelector(".timer .minutes"), minutes);
        this.set(document.querySelector(".timer .seconds"), seconds);
        this.set(document.querySelector(".timer .milliseconds"), milliseconds);
    };
    stop = () => {
        clearInterval(this.timer);

        this.timer = null;
    };
    format = () => [
        String(Math.floor(this.milliseconds / 60000)).padStart(2, "0"),
        String(Math.floor((this.milliseconds % 60000) / 1000)).padStart(2, "0"),
        String(this.milliseconds % 1000).padStart(3, "0")
    ];
};