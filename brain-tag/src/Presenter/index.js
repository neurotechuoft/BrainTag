// Presenter class
import React, {Component} from 'react';
import ChannelView from '../Views/Channel';
import io from 'socket.io-client';
import {VIEWS, TAGS} from './Constants';
import Services from '../Services';
import DataFormatter from './DataFormatter';

/**
 * Presenter in MVP Architecture.
 */
class Presenter extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: VIEWS.CHANNELS,
            // Object where keys are all Tag names, values are Bool: whether the tag is toggled "On" or not
            tags: undefined,
            // Bool: T/F whether the current data is being recorded
            record: undefined,
            // Object where keys are all Channel names, values are Bool: whether the channel is toggled "On" or not
            channels: undefined
        }
        this.initializeChannels = this.initializeChannels.bind(this);
        this.mockHandler = this.mockHandler.bind(this);
    }

    mockHandler(msg){
        console.log(msg);
    }

    initializeChannels(incomingData){
        let data = DataFormatter.formatIncomingEEG(incomingData);
        let curChannels = {};
        data['channels'].forEach((value)=> (curChannels[value]=false));
        this.setState({
            channels: curChannels
        });
        Services.EEG.removeHandler("data", this.initializeChannels);
    }

    componentDidMount(){
        let record = false;
        let curTags = {};
        TAGS.forEach((value)=> (curTags[value]=false));
        this.setState({
            tags: curTags,
            record: record
        });
        Services.EEG.addHandler("data", this.initializeChannels);
    }

    render() {
        if(this.state.page === VIEWS.CHANNELS){
            var socket = io('http://localhost:8005/')
                .on("connect", () => {
                    console.log("connected!");
                });
            
            return (
                <ChannelView socket={socket} 
                    tags={this.state.tags}
                    isRecord={this.state.record}
                    onRecordToggle={()=>{this.mockHandler("Record Toggled")}}
                    onTagToggle={(tag)=>{this.mockHandler("Tag Toggled: " + tag)}} />
            );
        }
        return "";
    }

}

export default Presenter;
