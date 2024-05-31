class Config {
    quarter = {
        amount: 4,
        length: 600,
    };

    getQuarterAmount = () => {
        return this.quarter.amount;
    }
    getQuarterLength = () => {
        return this.quarter.length;
    }
}

class Timer {
    timer = null;
    seconds = 0;
    quarter = 0;

    constructor() {
        this.quarter = 1;
        this.seconds = config.getQuarterLength();

        const [ minutes, seconds ] = this.format();
        this.set(document.querySelector(".timer .minutes"), minutes);
        this.set(document.querySelector(".timer .seconds"), seconds);
        this.set(document.querySelector(".quarter .number"), this.quarter);
        this.set(document.querySelector(".timer .control"), "Start Clock");

        document.querySelector(".timer .control").removeAttribute("disabled");

        document.querySelector(".timer .control").addEventListener("click", () => {
            this.toggle();
        });

        document.querySelector(".timer .minutes_up").addEventListener("click", () => {
            this.seconds += 60;

            const [ minutes, seconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
        });

        document.querySelector(".timer .minutes_down").addEventListener("click", () => {
            this.seconds -= 60;

            const [ minutes, seconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
        });

        document.querySelector(".timer .seconds_up").addEventListener("click", () => {
            this.seconds++;

            const [ minutes, seconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
        });

        document.querySelector(".timer .seconds_down").addEventListener("click", () => {
            this.seconds--;

            const [ minutes, seconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);
        });
    }

    run = () => {
        if (this.seconds !== 0) {
            this.seconds--;
            const [ minutes, seconds ] = this.format();
            this.set(document.querySelector(".timer .minutes"), minutes);
            this.set(document.querySelector(".timer .seconds"), seconds);

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
        const [ minutes, seconds ] = this.format();
        this.set(document.querySelector(".timer .minutes"), minutes);
        this.set(document.querySelector(".timer .seconds"), seconds);

        this.timer = setInterval(this.run, 1000);
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
        if (this.quarter <= config.getQuarterAmount()) {
            return;
        }
        
        this.quarter++;
        this.set(document.querySelector(".quarter .number"), this.quarter);

        this.start();
    };
    stop = () => {
        clearInterval(this.timer);

        this.timer = null;
    };
    format = () => [
        String(Math.floor(this.seconds / 60)).padStart(2, "0"),
        String(this.seconds % 60).padStart(2, "0")
    ];
}

const config = new Config();
const timer = new Timer();