import React from 'react';
import Toggle from './Toggle';
import './index.css';

export default function Buttons(props){
	let items = [];

	// Add record button
	items.push((
		<Toggle isEnabled={props.isRecord} enabledBackground="#F74F56" key={"record"} onClick={props.onRecordToggle} >
			&#11044;
		</Toggle>
	));

	// Add tag buttons
	if(props.tags){
		Object.keys(props.tags).forEach((tag) => {
			items.push((
				<Toggle isEnabled={props.tags[tag]} key={tag} onClick={()=>{props.onTagToggle(tag)}} >
					{tag}
				</Toggle>
			));
		});
	}
	
	return (
		<div className="ButtonBar">
			{items}
		</div>
	);
}
