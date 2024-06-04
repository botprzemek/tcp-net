import { ScoreTable } from "./scoreTable.js";
import { Timer } from "./timer.js";

export class Game {
    scoreTable;
    timer;

    constructor() {
        this.scoreTable = new ScoreTable();
        this.timer = new Timer();
    };

    getScoreTable() {
        return this.scoreTable;
    }

    getTimer() {
        return this.timer;
    }
};