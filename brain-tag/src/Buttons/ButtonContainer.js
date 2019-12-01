import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './ButtonContainer.css';
import {getDataPointJSON} from '../Utils/Record';

// Should import all the tag strings from another file but for now they will be determined in this file

const RECORD = "record"
const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";


let tags = [UP, DOWN, LEFT, RIGHT];

class ButtonContainer extends React.Component{
	state = {
		channels: {
			channel_1: undefined,
			channel_2: undefined,
			channel_3: undefined,
			channel_4: undefined
		},
		assignedTags: [],
		recording: false
	};
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.file_socket = this.props.file_socket;
		this.handleClick = this.handleClick.bind(this);
		this.getChannelData = this.getChannelData.bind(this);
		this.interval = null;
	}

	componentDidMount(){
		this.getChannelData();
	}

	getChannelData() {
		if(this.socket){
			console.log("here")
			this.socket.on("data", data => {
				this.setState({
					channels: {
						channel_1: data.channel_1,
						channel_2: data.channel_2,
						channel_3: data.channel_3,
						channel_4: data.channel_4
					}
				})
			})
		}
	}

	handleClick(e) {
		
		// If tag already in assignedTags, remove it (toggle off)
		if (this.state.assignedTags.includes(e.target.id)){
			var newTags = [...this.state.assignedTags];
			var index = newTags.indexOf(e.target.id);
			newTags.splice(index, 1);
			this.setState({
				assignedTags: newTags
			});
		}
		// If tag not in assignedTags, add it (toggle on)
		else if (e.target.id !== RECORD){
			console.log('here');
			this.setState({
				assignedTags: [...this.state.assignedTags, e.target.id]
			});
		}
		// If Record, start connection to socket.
		else{
			// If already recording, stop
			if (this.state.recording){
				clearInterval(this.interval);
				this.setState({
					recording: false
				})
			}
			else{
				this.setState({
					recording: true
				});
				var data = {};
				
		 	 	this.file_socket.on("connect", () => {
		 	 		console.log("connected to fileserver");
		 	 	})
			 		this.interval = setInterval(() => {
						data = getDataPointJSON(this.state.channels, tags, this.state.assignedTags)
						console.log(data);
		 	 			this.file_socket.emit("JSONData", data, err => {
		 	 			if (err){
		 	 				console.log(err);
		 	 			}
			  		});
				 }, 1);
			}
		}
	}

	render() {
		return (
			<div>
				<Button id={RECORD} className="ml-3" onClick={this.handleClick}>&#11044;</Button>
				<Button id={UP} className="ml-3" onClick={this.handleClick}>Up</Button>
				<Button id={DOWN} className="ml-3" onClick={this.handleClick}>Down</Button>
				<Button id={LEFT} className="ml-3" onClick={this.handleClick}>Left</Button>
				<Button id={RIGHT} className="ml-3" onClick={this.handleClick}>Right</Button>
			</div>
		);
	}
}
export default ButtonContainer;