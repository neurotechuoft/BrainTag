// Services class to interface with external connections

import Sockets from "./Sockets";

let eeg_socket = (new Sockets()).eeg_socket;
let store_socket = (new Sockets()).store_socket;

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
    // console.log(handler);

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

/** Example Usage
 * import Services from '/src/Services';
 * 
 * Services.EEG.addHandler(eventName, handler);
 * Services.Storage.addHandler("data", (data)=> {..do something...});
 */
export default {
    EEG: {
        addHandler: (eventName, handler) => addHandler(eeg_socket, eventName, handler),
        removeHandler: (eventName, handler) => removeHandler(eeg_socket, eventName, handler)
    },
    Storage: {
        addHandler: (eventName, handler, callback) => addHandler(store_socket, eventName, handler, callback),
        removeHandler: (eventName, handler) => removeHandler(store_socket, eventName, handler),
        emitHandler: (eventName, handler) => emitHandler(store_socket, eventName, handler)
    }

};