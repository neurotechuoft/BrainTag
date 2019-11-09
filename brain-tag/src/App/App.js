import React from 'react';
import './App.css';
import io from 'socket.io-client';
import DynamicLineGraph from '../DynamicLineGraph/DynamicLineGraph';

function App() {

	var socket = io('http://localhost:8005/');
	socket.on("connect", () => {
		console.log("connected!");
	});

	return (
		<div className="App">
			<DynamicLineGraph 
				socket={socket} 
				secondsToShow={1} 
				refreshRate={60}
				channel={"channel_1"}
			/>
		</div>
	);
}

export default App;
