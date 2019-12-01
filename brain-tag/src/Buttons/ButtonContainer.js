import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './ButtonContainer.css';
import getDataPointJson from '../Utils/Record';

// Should import all the tag strings from another file but for now they will be determined in this file

const RECORD = "record"
const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";


let tags = [UP, DOWN, LEFT, RIGHT];

class ButtonContainer extends React.Component{
	state = {
		assignedTags: []
	};
	constructor(props) {
		super(props);
		this.socket = this.props.socket;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		var data = {

		};
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
			this.setState({
				assignedTags: [...this.state.assignedTags, e.target.id]
			})
		}
		// If Record, start connection to socket.
		// else{
		//  	const socket = io("http://localhost:8009", {
		//  			"timeout": 10000,
		//  			"transports": [WebSocket]
		//  		});
		//  		socket.on("connect", () => {
		//  			console.log("connected");
		//  		});
		//  		socket.emit("JSONData", data, err => {
		//  			if (err){
		//  				console.log(err);
		//  			}
		//  		});	
		// }
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