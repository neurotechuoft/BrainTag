import React from 'react';
import './App.css';
import io from 'socket.io-client';
import ChannelContainer from '../PowerGraph/ChannelContainer'
import DynamicLineGraph from '../DynamicLineGraph/DynamicLineGraph';
import BottomButton from '../Buttons/BottomButton';

function App() {

	var socket = io('http://localhost:8005/');
	socket.on("connect", () => {
		console.log("connected!");
	});

	return (
		<div className="App">
			<p className="header" > Chart View </p>
      		<div className="Charts">
				<ChannelContainer className="chart" sampleRate='1000' intervalSize ='1000' socket={socket}  />
			</div>
			<BottomButton></BottomButton>
		</div>
	);
}

export default App;
