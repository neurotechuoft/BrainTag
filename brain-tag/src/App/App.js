import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Buttons from '../Views/Components/Buttons/';
import Channels from '../Views/Components/Channels/'

function App() {

	var socket = io('http://localhost:8005/');
	socket.on("connect", () => {
		console.log("connected!");
	});

	return (
		<div className="App">
			<p className="header" > Chart View </p>
      		<div className="Charts">
				<Channels className="chart" sampleRate='1000' intervalSize ='1000' socket={socket}  />
			</div>
			<Buttons/>
		</div>
	);
}

export default App;
