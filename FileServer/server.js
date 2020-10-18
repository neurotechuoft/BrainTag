const io = require('socket.io')(8009) // FileServer will be run on http://localhost:8009
const fs = require('fs');

// Files will be created in the data directory

const MAX_SIZE = 1; // Sets the max file size to approx 1 MB
const FILE_WRITE_DELAY = 1000; // Writes to file ever 1 second
const DISCONNECT_DELAY = 3*FILE_WRITE_DELAY;

io.on('connection', (socket) => {
    // Create an object that will continuously push data to a table
    var obj = {
        table: [null]
    };
    let files = [];
    
    // Adds the data to the array in obj
    socket.on('JSONData', data => {
        if (data.record === true) {
            obj.table.push(data);
        }
    });

    // On disconnect, log which files have been created.
    socket.on('disconnect', () => {setTimeout(() => {
        console.log("Data saved to: " , files);
    }), DISCONNECT_DELAY});

    
    setInterval(function () {
        // If new data, add it to a file
        if (obj.table.length > 0) {
            if (files.length === 0 || getFileSizeKiloBytes(files[files.length-1]) >= MAX_SIZE) {
                files.push("data-"+Date.now()+".json")
                // Clear the obj array on creation of new file, in order to avoid dupicate data.
                obj.table.length = 0;
            }
            let fileName = files[files.length-1];
            var jsonData = JSON.stringify(obj);
            fs.writeFile("data/"+fileName, jsonData + '\r\n', 'utf-8', function(err) {
                if(err) console.log('error', err);
            });
        }
    }, FILE_WRITE_DELAY);
});


// Function to get the file size in bytes
function getFileSizeKiloBytes(fileName){
    var stats = fs.statSync("data/"+fileName);
    var fileSizeKiloBytes = stats['size'];
    fileSizeKiloBytes = fileSizeKiloBytes / 1000000
    return fileSizeKiloBytes;
}