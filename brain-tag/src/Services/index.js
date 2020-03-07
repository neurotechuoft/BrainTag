// Services class to interface with external connections

import {Socket,
    addHandler,
    removeHandler,
    emitHandler} from "./Socket";

let eeg_socket = (new Socket()).eeg_socket;
let store_socket = (new Socket()).store_socket;

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
