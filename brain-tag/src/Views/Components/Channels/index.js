// Represents all the channels + menu in the view

import React, {Component} from 'react';
import './index.css'; // fpor styling of the charts (width, etc.)
import {calcPsdAllChan} from './PowerHelpers.js';
import Row from './Row.js';
import PropTypes from 'prop-types';
import {Store as ContextInherit} from '../../../Services/GlobalContext';


export default class ChannelContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false, //see component did catch
            //record last 1s from socket 
            channels : [],
            signals : {}, //key is channels
            charts :  {}, //key is channels
        }
        this.bindInterval = this.bindInterval.bind(this);
        this.EEGHandler = this.EEGHandler.bind(this);
    }

    async componentDidMount() {
        this.bindInterval() 
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.log("ERROR", error, info);
    }

    // helper to append new items from the socket without hardcoding 
    appendItem(channelName, toAppend) {
        let current = this.state.signals;
        if (!current[channelName]) { //if first and key is unknown 
            current[channelName] = [toAppend]
        }
        else {
            current[channelName].push(toAppend)
        }
        this.setState({signals : current})
    }

    
    // not hard code number of channels, shifts by one second window (4s total)
    shiftWindow() {
        let updated = {};
        for (let i=0; i<this.state.channels.length; i++) {
            let channelName = this.state.channels[i]
            let sigCopy = this.state.signals[channelName]
            sigCopy.splice(0, (this.context.intervalSize*this.context.refreshRate))
            updated[channelName] = sigCopy
            console.log("updated", updated[channelName], updated[channelName].length)

        }
        this.setState({signals : updated})
    }

    // not hardcode number of channels
    renderRows() {
        let rows = [];
        for (let i=0; i<this.state.channels.length; i++) {
            let channelName = this.state.channels[i]
            rows.push(<Row channelName={channelName} options={this.state.charts[channelName]} 
                addEEGHandler={this.context.addEEGHandler}></Row>);
        }
        return(rows)
    }

    EEGHandler(data) {
        let keys = Object.keys(data);
        keys.pop() //assumes last element is time 
        this.setState({channels : keys})
        // loop over keys in channels to make arrays of data 
        for (let i=0; i<this.state.channels.length; i++) {
            let channelName = this.state.channels[i]
            let toAppend = parseFloat(data[channelName])
            this.appendItem(channelName, toAppend)
        }
        //check to see if array is updated to be the display size
        if (this.state.signals[keys[0]].length === this.context.intervalSize ) {
            // calculate psds
            let psdAsArr = calcPsdAllChan(this.state.signals, this.state.channels, 
                this.context.intervalSize, this.context.sampleRate)
            this.setState({charts : psdAsArr})
            // call helper to splice arrays so they don't contain last bits
            this.shiftWindow();
        }
    }

    bindInterval() {
        if (this.context.addEEGHandler) {
            this.context.addEEGHandler("data", this.EEGHandler);
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Please run dummy server on port 8005. </h1>;
        }
        return(
            <div> 
                { (this.state.charts) &&
                <div>{this.renderRows()}</div>
                }
            </div>
        )
    }
}

ChannelContainer.propTypes = {
    className: PropTypes.string
}

ChannelContainer.contextType = ContextInherit;
