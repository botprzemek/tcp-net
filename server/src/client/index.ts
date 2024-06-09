import { config } from "../config";
import { Connector } from "../connector";

export class Client extends Connector {
    constructor() {
        super(config.address().CLIENT_HOST, config.address().CLIENT_PORT);
    }
}