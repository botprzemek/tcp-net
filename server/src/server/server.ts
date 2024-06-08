import { config } from "../config";
import {Connector} from "../connector/connector";

export class Server extends Connector {
    constructor() {
        super();
        this.socket
            .on("error", this.error)
            .on("message", this.receive)
            .on("listening", this.listen)
            .bind(config.address().SERVER_PORT, config.address().SERVER_HOST);
    }
}