// Class to Initialize Socket Connections
import io from "socket.io-client";

class Socket {
    constructor() {
        if (! Socket.instance) {
            const connectionOptions =  {
                "force new connection" : true,
                //avoid having user reconnect manually in order to prevent dead clients after a server restart
                "reconnectionAttempts": "Infinity", 
                //before connect_error and connect_timeout are emitted.
                "timeout" : 10000,                  
                "transports" : ["websocket"]
            };

            // Socket to connect to NeurostackClient (Temporarily using DummyServer)
            this.eeg_socket = io('http://localhost:8005', connectionOptions)
                .on("connect", () => {
                    console.log("Connected to Real time EEG socket.");
                });
            // Socket to connect to FileServer
            this.store_socket = io('http://localhost:8009', connectionOptions)
                .on("connect", () => {
                    console.log("Connected to Data Storage socket.");
                });
            Socket.instance = this;
        }
        return Socket.instance
    }
}

// Adds an event handler to the eventName for the specified socket
// All arguments are mandatory
function addHandler(socket, eventName, handler, callback){
    if(!socket.connected){
        console.log("Cannot add handler to a socket that is closed: ", socket);
    }
    socket.on(eventName, handler);
    if (callback){
        callback();
    }
}

function emitHandler(socket, eventName, handler){
    if(!socket.connected){
        console.log("Cannot add handler to socket that is closed: ", socket);
    }
    socket.emit(eventName, handler);
}

// Removes an event handler for the event name for the specified socket
// socket is mandatory. eventName and handler are optional.
// If handler is not specified, all listeners for the eventName are removed.
// If eventName is not specified, all listeners for all events on the socket are removed.
function removeHandler(socket, eventName, handler){
    if(!socket.connected){
        console.log("Cannot remove handler to a socket that is closed: ", socket);
    }
    if(eventName){
        if(handler){
            socket.off(eventName, handler);
        } else {
            socket.off(eventName);
        }
    } else {
        socket.off();
    }
}

export default {Socket, addHandler, emitHandler, removeHandler};
