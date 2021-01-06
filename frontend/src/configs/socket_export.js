// ws.js
import io from "socket.io-client";
//configs
import { config } from "./config_connections";
const configs = config();

const socket = io(`${configs.ipServer}`);
socket.on("connect", () => console.log(`[IO] Connect => A new connection has been established ${socket.id}`));

export { socket };
