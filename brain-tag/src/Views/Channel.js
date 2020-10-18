// Represents the Real Time Channels View

import React, { useEffect } from 'react';
import Buttons from './Components/Buttons/';
import Channels from './Components/Channels/';
import './Channel.css';
import PropTypes from 'prop-types';


export default function Channel(props){

    useEffect(() => {
        props.addEEGHandler('data', (data) => {
            props.handleStorage(data)
        })
        return (() => console.log('unmounted'))
    })

    return (
        <div className="App">
            <p className="header" > Chart View </p>
            <div className="Charts">
                <Channels 
                    className="chart"
                    sampleRate='256'
                    intervalSize ='1024' //closest power of 2
                    addEEGHandler={props.addEEGHandler} />
            </div>
            <Buttons
                tags={props.tags}
                isRecord={props.isRecord}
                onRecordToggle={props.onRecordToggle}
                onTagToggle={(tag)=> {props.onTagToggle(tag)}}
            />
        </div>);
}

Channel.propTypes = {
    addEEGHandler: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired,
    isRecord: PropTypes.func.isRequired,
    onRecordToggle: PropTypes.func.isRequired,
    onTagToggle: PropTypes.func.isRequired
};
