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
        this.quarter = config.getQuarterAmount();
        this.set(document.querySelector(".quarter_number"), this.quarter);

        this.seconds = config.getQuarterLength();
        this.set(document.querySelector(".minutes"), this.seconds);

        this.start();
        // document.querySelector(".control").addEventListener("click", () => {
        //
        // });
    }

    run = () => {
        if (this.seconds !== 0) {
            this.seconds--;
            this.set(document.querySelector(".minutes"), this.format());

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
        this.seconds = config.getQuarterLength();
        this.set(document.querySelector(".minutes"), this.seconds);

        this.timer = setInterval(this.run, 1000);
    };
    next = () => {
        if (this.quarter <= 1) {
            return;
        };
        
        this.quarter--;
        this.set(document.querySelector(".quarter_number"), this.quarter);

        this.start();
    };
    stop = () => {
        clearInterval(this.timer);
    };
    format() {
        const minutes = Math.floor(this.seconds / 60);
        const remainingSeconds = this.seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };
}

const config = new Config();
const timer = new Timer();