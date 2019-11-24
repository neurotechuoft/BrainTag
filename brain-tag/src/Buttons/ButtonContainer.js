import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './ButtonContainer.css';

class ButtonContainer extends React.Component{
	constructor(props) {
		super(props);

		this.socket = this.props.socket;
	}

	handleClick(e) {
		console.log(e.target)
	}

	render() {
		return (
			<div>
				<Button className="ml-3" onClick={this.handleClick}>&#11044;</Button>
				<Button className="ml-3" onClick={this.handleClick}>Up</Button>
				<Button className="ml-3" onClick={this.handleClick}>Down</Button>
				<Button className="ml-3" onClick={this.handleClick}>Left</Button>
				<Button className="ml-3" onClick={this.handleClick}>Right</Button>
			</div>
		);
	}
}
export default ButtonContainer;