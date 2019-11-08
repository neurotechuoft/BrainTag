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
			{/* <DynamicLineGraph 
				socket={socket} 
				secondsToShow={0.5} 
				refreshRate={60}
				channel={"channel_2"} 
			/>
			<DynamicLineGraph 
				socket={socket} 
				secondsToShow={0.5} 
				refreshRate={60}
				channel={"channel_3"} 
			/>
			<DynamicLineGraph 
				socket={socket} 
				secondsToShow={0.5} 
				refreshRate={60}
				channel={"channel_4"} 
			/> */}
		</div>
	);
}

export default App;
