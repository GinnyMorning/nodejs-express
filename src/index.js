const app = require("./app");

let server;

server = app.listen(3000, () => {
    console.log("App connected on port 3000");
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log("Close server");
            process.exit(1);
        });
    }
};

const unexpectedErrorHandler = (err) => {
    console.log("Exit");
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    if (server) {
        console.log("close server due to sig kill");
        server.close();
    }
});
