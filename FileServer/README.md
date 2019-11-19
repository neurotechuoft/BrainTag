# FileServer
This is a server used to parse JSON objects recieved from the front-end into JSON files.

## Setting up Server
1. Navigate to the FileServer directory in a **new** terminal.
2. Install dependencies 
    > npm install
3. Start the server. Will be at http://localhost:8009
    > npm start
4. When a client connects to the server, you should see messages on the terminal. All the files will be saved to the data directory within FileServer.

## Example Client
A sample of how to connect/interact with this file server can be found in ./examples/client.js . The following steps show how to run this file. 
1. Navigate to the FileServer directory in a **new** terminal.
2. Open a client socket connection
    > node ./examples/client.js
3. When successfully connected to the server, you should see messages on the terminal.