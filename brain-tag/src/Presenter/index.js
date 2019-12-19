// Presenter class
import React, {Component} from 'react';
import ChannelView from '../Views/Channel';
import io from 'socket.io-client';
import Tags from './ApplicationTags';
import Services from '../Services';
import DataFormatter from './DataFormatter';

const VIEWS = {
    CHANNELS: "channels"
}

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
    }

    initializeChannels(incomingData){
        let data = DataFormatter.FormatIncomingEEG(incomingData);
        let curChannels = data['channels'].reduce((acc,curr)=> (acc[curr]=false, data['channels']),{});
        this.setState({
            channels: curChannels
        });
        Services.EEG.removeHandler("data", this.initializeChannels);
    }

    componentDidMount(){
        let record = false;
        let curChannels = {};
        let allTags = Tags;
        let curTags = allTags.reduce((acc,curr)=> (acc[curr]=false, allTags),{});
        this.setState({
            tags: curTags,
            record: record,
            channels: curChannels
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
                <ChannelView socket={socket} />
            );
        }
        return "";
    }

}

export default Presenter;
