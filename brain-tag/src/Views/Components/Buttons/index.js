import React, { Component } from 'react';
import Toggle from './Toggle';
import './index.css';
class Buttons extends Component{
	render() {
		return (
		<div>
			<div>
				<Toggle text= "&#11044;" bg="#F74F56" ></Toggle>
				<Toggle text={"Up"}bg = '#5EBA7D' ></Toggle>
				<Toggle text={"Down"}bg = '#5EBA7D' >DOWN</Toggle>
				<Toggle text={"LEFT"}bg = '#5EBA7D' >LEFT</Toggle>
				<Toggle text={"RIGHT"}bg = '#5EBA7D' ></Toggle>
			</div>
		</div>
		);
	}
}
export default Buttons;
