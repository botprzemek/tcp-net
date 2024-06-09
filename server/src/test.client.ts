import { Client } from "./client";
import {config} from "./config";

const client: Client = new Client();

setInterval(() => client.send("Pong", config.address().SERVER_HOST, config.address().SERVER_PORT), 1000);
