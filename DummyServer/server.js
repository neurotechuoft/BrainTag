const io = require('socket.io')(8005); // Server is at http://localhost:8005

let i = 0;
const MULT = 50;

io.on('connection', (socket) => {
    // Precondition: func must be a function that returns a number
    function getRandNumStr(func){
        return (func(i + Math.random()) * MULT).toString();
    }

    setInterval(() => {
        i++;
        let data = {
            "channel_1": getRandNumStr(Math.sin),
            "channel_2": getRandNumStr(Math.cos),
            "channel_3": getRandNumStr((i) => {return Math.sin(i) * -0.1}),
            "channel_4": getRandNumStr((i) => {return Math.cos(i) * -0.5})
        };
        socket.emit("data", data, (err, msg) => {
            // Callback
            if (err) console.error(err);
            console.log(msg);
        });
        console.log("emitted: [", data.channel_1, data.channel_2, data.channel_3, data.channel_4, "]");
    }, 1);
    console.log("Connected");
});

