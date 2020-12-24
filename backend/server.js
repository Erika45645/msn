const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);

const bodyparser = require("body-parser");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const port = process.env.PORT || 80;

const io = require("socket.io")(server);

let socketsConnected = [];

app.get("/", (req, res) => {
    res.send("Olá mundo ");
});

app.post("/teste", (req, res) => {
    res.send("Olá mundo teste post ok");
});

app.get("/statusall", (req, res) => {
    return res.json({
        socketsConnected,
    });
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socketsConnected.push(socket.id);
    console.log(socketsConnected);

    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
    });

    // sending to the client
    io.emit("socketsConnected", socketsConnected);

    socket.on("disconnect", () => {
        io.emit("socketsConnected", socketsConnected);
        const index = socketsConnected.indexOf(socket.id);
        if (index !== -1) {
            socketsConnected.splice(index, 1);
        }
        console.log("user disconnected");
        console.log(socketsConnected);
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});