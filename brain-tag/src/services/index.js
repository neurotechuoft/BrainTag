// Services class to interface with external connections

 import Sockets from "./Sockets";

let eeg_socket = (new Sockets()).eeg_socket;
let store_socket = (new Sockets()).store_socket;

function addHandler(socket, eventName, handler){
    socket.on(eventName, handler);
}

/** Example Usage
 * import Services from '/src/Services';
 * 
 * Services.EEG.addHandler(eventName, handler);
 * Services.Storage.addHandler("data", (data)=> {..do something...});
 */
export default {
    EEG: {
        addHandler: (eventName, handler) => addHandler(eeg_socket, eventName, handler)
    },
    Storage: {
        addHandler: (eventName, handler) => addHandler(store_socket, eventName, handler)
    }
};