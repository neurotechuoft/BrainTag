const io = require('socket.io')(8009) // FileServer will be run on http://localhost:8009
const fs = require('fs');


io.on('connection', (socket) => {
    // Create an object that will continuously push data to a table
    var obj = {
        table: []
    }
    
    // Adds the data to the array in obj
    socket.on('JSONData', data => {
        console.log('recieved');
        obj.table.push(data);
    });

    // On disconnect, create a file with the contents in the array
    socket.on('disconnect', () => {
        // Name of the file that will be created
        var name = "data-"+Date.now()+'.json';

        // Converts obj to readable JSON
        var jsonData = JSON.stringify(obj);

        // Writes a file with the JSON data
        fs.writeFile(name, jsonData + '\r\n', 'utf-8', function(err) {
            if(err) console.log('error', err);
        });

        // Clears any data in the array
        obj.table = [];

        // Output the size of the file after 5 seconds
        setTimeout(function () {
            fs.stat(name, function(err, stat) {
                if(err == null) {
                    console.log(getFileSizeBytes(name));
                }
            });
        }, 5000)
        
    });


});

// Function to get the file size in bytes
function getFileSizeBytes(file){
    var stats = fs.statSync(file);
    var fileSizeBytes = stats['size'];
    fileSizeBytes = fileSizeBytes / 1000000
    return fileSizeBytes;
}