# DummyServer
This is a server to use for development of BrainTag. This will be removed as Neurostack development progresses!

## Setting up
1. Navigate to the DummyServer directory in a **new** terminal.
2. Install dependencies 
    > npm install
3. Start the server. Will be at http://localhost:8005
    > node server.js
4. When a client connects to the server, you should see messages on the terminal.

## Example Client
A sample of how to connect/interact with the dummy server can be found in ./Examples/client.js . The following steps show how to run this file. 
1. Navigate to the DummyServer directory in a **new** terminal.
2. Open a client socket connection
    > node ./Examples/client.js
3. When successfully connected to the server, you should see messages on the terminal.