
// Adds an event handler to the eventName for the specified socket
// All arguments are mandatory
export function addHandler(socket, eventName, handler, callback) {
    if(!socket.connected){
        console.log("Cannot add handler to a socket that is closed: ", socket);
    }
    socket.on(eventName, handler);
    if (callback){
        callback();
    }
}

export function emitHandler(socket, eventName, handler){
    if(!socket.connected){
        console.log("Cannot add handler to socket that is closed: ", socket);
    }
    socket.emit(eventName, handler);
}

// Removes an event handler for the event name for the specified socket
// socket is mandatory. eventName and handler are optional.
// If handler is not specified, all listeners for the eventName are removed.
// If eventName is not specified, all listeners for all events on the socket are removed.
export function removeHandler(socket, eventName, handler){
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

export default {addHandler, emitHandler, removeHandler};
