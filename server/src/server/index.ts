import { config } from "../config";
import { Connector } from "../connector";

export class Server extends Connector {
    constructor() {
        super(config.address().SERVER_HOST, config.address().SERVER_PORT);
    }
}