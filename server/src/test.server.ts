import { Server } from "./server";
import { config } from "./config";

const server: Server = new Server();

setInterval(() => server.send("Ping", config.address().CLIENT_HOST, config.address().CLIENT_PORT), 1000);