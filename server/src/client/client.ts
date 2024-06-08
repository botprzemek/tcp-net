import { Connector } from "../connector/connector";
import {config} from "../config";
import * as zlib from "zlib";

export class Client extends Connector {
    constructor() {
        super();
        this.socket
            .on("error", this.error)
            .on("message", this.receive)
            .on("listening", this.listen)
            .bind(config.address().CLIENT_PORT, config.address().CLIENT_HOST);
    }
}