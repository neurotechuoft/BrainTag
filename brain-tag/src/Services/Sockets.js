// Class to Initialize Socket Connections
import io from "socket.io-client";

export default class Sockets {
    constructor() {
        if (! Sockets.instance) {
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
            Sockets.instance = this;
        }
        return Sockets.instance
    }
}