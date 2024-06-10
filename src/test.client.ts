import { Client } from "./client";
import { config } from "./config";

class TestClient extends Client {
    test = () => {
        this.send("Test from Client!", config.address().SERVER_HOST, config.address().SERVER_PORT);
    }
}

const client: TestClient = new TestClient();

client.test();
