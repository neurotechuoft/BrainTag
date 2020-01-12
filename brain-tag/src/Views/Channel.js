// Represents the Real Time Channels View

import React from 'react';
import Buttons from './Components/Buttons/';
import Channels from './Components/Channels/';
import './Channel.css'

export default function Channel(props){
    return (
    <div className="App">
        <p className="header" > Chart View </p>
        <div className="Charts">
            <Channels className="chart" sampleRate='1000' intervalSize ='1000' addEEGHandler={props.addEEGHandler}  />
        </div>
        <Buttons
            tags={props.tags}
            isRecord={props.isRecord}
            onRecordToggle={props.onRecordToggle}
            onTagToggle={(tag)=> {props.onTagToggle(tag)}}
        />
    </div>);
}
