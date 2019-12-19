import React, { Component } from 'react';
import Toggle from './Toggle';
import './index.css';

class Buttons extends Component {

	render() {
		return (
		<div className="ButtonBar">
			<Toggle enabledBackground="#F74F56" >&#11044;</Toggle>
			<Toggle>UP</Toggle>
			<Toggle>DOWN</Toggle>
			<Toggle>LEFT</Toggle>
			<Toggle>RIGHT</Toggle>
		</div>
		);
	}
}
export default Buttons;
