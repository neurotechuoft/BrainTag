const io = require('socket.io-client')

const socket = io('http://localhost:8009', {
    "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
});

socket.on("connect", () => {
    console.log("connected!");


});

setInterval(() => {
    var data = {
        //add timestamp
        channels:{
        "channel_1": Math.floor(Math.random()*100),
        "channel_2": Math.floor(Math.random()*100),
        "channel_3": Math.floor(Math.random()*100),
        "channel_4": Math.floor(Math.random()*100)
        },
        tags:{
            "tag1": 1
        }
    }
    socket.emit("JSONData", data, err => {
        if (err){
            console.log(err);
        }
    });
}, 1);

