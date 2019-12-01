import React from 'react';
import './App.css';
import io from 'socket.io-client';
import ChannelContainer from '../PowerGraph/ChannelContainer';
import ButtonContainer from '../Buttons/ButtonContainer';

function App() {

	var socket = io('http://localhost:8005/');
	var file_socket = io('http://localhost:8009/')
	socket.on("connect", () => {
		console.log("connected!");
	});

	return (
		<div className="App">
			<p className="header" > Chart View </p>
      		<div className="Charts">
				<ChannelContainer className="chart" sampleRate='1000' intervalSize ='1000' socket={socket}  />
			</div>
			<ButtonContainer socket={socket} file_socket={file_socket} />
		</div>
	);
}

export default App;
