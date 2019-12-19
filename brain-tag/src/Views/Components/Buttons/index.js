import React, { Component } from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toggle from './Toggle';
import './index.css';
class Buttons extends Component{
	render() {
		return (
		<div className="ButtonBar">
			<Toggle bg="#F74F56" >&#11044;</Toggle>
			<Toggle bg = '#5EBA7D' >UP</Toggle>
			<Toggle bg = '#5EBA7D' >DOWN</Toggle>
			<Toggle bg = '#5EBA7D' >LEFT</Toggle>
			<Toggle bg = '#5EBA7D' >RIGHT</Toggle>
		</div>
		);
	}
}
export default Buttons;
