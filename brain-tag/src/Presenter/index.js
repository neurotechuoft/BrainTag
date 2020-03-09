// Presenter class
import React, {Component} from 'react';
import ChannelView from '../Views/Channel';
import {VIEWS, TAGS} from './Constants';
import Services from '../Services';
import DataFormatter from './DataFormatter';
import ContextProvider from '../Services/GlobalContext';

/**
 * Presenter in MVP Architecture.
 */
var data1 = {
    channels: undefined,
    tags: undefined,
    timestamp: undefined
}
var record = false;
class Presenter extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Represents: Current page being displayed
            // Data: string
            page: VIEWS.CHANNELS,
            // Represents: Channels (a.k.a. Electrodes) on headset
            // Data: JSON object. keys - channel names. values - booleans (whether channel is toggle "On").
            channels: undefined,
            // Represents: The current time associated with the data being collected
            timestamp: undefined,
            // Represents: Whether we are currently recording the data
            // Data: boolean
            record: false,
            // Represents: The tags that can be associated with the collected data
            // Data: list of tag names
            tags_list: [],
            // Represents: The values of tags that can be associated with the collected data
            // Data: JSON object. keys - tag names. values - booleans (whether tag is toggled "On").
            tags: undefined
        }
        this.initializeChannels = this.initializeChannels.bind(this);
        this.getData = this.getData.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    initializeChannels(incomingData){
        let data = DataFormatter.formatIncomingEEG(incomingData);
        let curChannels = {};
        data['channels'].forEach((value)=> (curChannels[value]=0));
        this.setState({
            channels: curChannels,
        });
        Services.EEG.removeHandler("data", this.initializeChannels);
    }

    sendData(){
         return DataFormatter.getDataPointJSON(data1, TAGS, this.state.tags_list);
    }

    getData(data){
        const points = {
            "channel_1": data.channel_1,
            "channel_2": data.channel_2,
            "channel_3": data.channel_3,
            "channel_4": data.channel_4,

        };
        data1 = {
            channels: points,
            timestamp: data.time,
            tags: this.state.tags
        };
    }

    componentDidMount(){
        this.initializeTags();
        Services.EEG.addHandler("data", this.initializeChannels);
        this.recordDataHandler = this.recordDataHandler.bind(this);
        this.toggleRecord = this.toggleRecord.bind(this);
        this.toggleTag = this.toggleTag.bind(this);
    }

    initializeTags() {
        let curTags = {};
        TAGS.forEach((value)=> (curTags[value]=false));
        this.setState({
            tags: curTags,
            record: record
        });
    }

    toggleRecord() {
        this.setState({record: !this.state.record});
        if (this.state.record) {
            Services.EEG.addHandler("data", this.recordDataHandler);
        } else {
            Services.EEG.removeHandler("data", this.recordDataHandler);
        }
    }

    recordDataHandler(data) {
        console.log("emitting");
        this.getData(data);
        Services.Storage.emitHandler("JSONData", this.sendData());
    }

    toggleTag(tag) {
        let currTags = this.state.tags;
        currTags[tag] = !currTags[tag];
        this.setState({tags: currTags});
    }

    render() {
        if(this.state.page === VIEWS.CHANNELS){
            return (
                <ContextProvider addEEGHandler={Services.EEG.addHandler}>
                    <ChannelView
                        tags={this.state.tags}
                        isRecord={this.state.record}
                        onRecordToggle={this.toggleRecord}
                        onTagToggle={this.toggleTag} />
                </ContextProvider>
            );
        }
        return "";
    }

}

export default Presenter;
