const io = require('socket.io-client');

const socket = io('http://localhost:8005', {
    "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
});

socket.on("connect", () => {
    console.log("connected!");
});

socket.on("data", (data, callback) => {
    console.log("received: [", data.channel_1, data.channel_2, data.channel_3, data.channel_4, "]");
    callback(null, "Data successfully sent.");
});