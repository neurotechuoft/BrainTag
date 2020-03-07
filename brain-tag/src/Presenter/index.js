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
var interval;
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
            record: undefined,
            // Represents: The tags that can be associated with the collected data
            // Data: list of tag names
            tags_list: [],
            // Represents: The values of tags that can be associated with the collected data
            // Data: JSON object. keys - tag names. values - booleans (whether tag is toggled "On").
            tags: undefined,
            // Purpose: The interval for outputting recorded data to a file server
            interval: undefined
        };
        this.initializeChannels = this.initializeChannels.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getData = this.getData.bind(this);
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
         return getDataPointJSON(data1, TAGS, this.state.tags_list);
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
        let curTags = {};
        TAGS.forEach((value)=> (curTags[value]=false));
        this.setState({
            tags: curTags,
            record: record
        });
        Services.EEG.addHandler("data", this.initializeChannels);        

        this.toggleRecord = function (){
            record = !record;
            if (!record){
                console.log("stopped");
                get_socket.disconnect();
                disconnected = true;
                clearInterval(interval);
            }
            else{
                if (disconnected){
                    get_socket.open();
                    disconnected = false;
                }

                interval = setInterval(() => {
                    get_socket.on("data", data => {
                        console.log("emitting");
                        this.getData(data);
                        Services.Storage.emitHandler("JSONData", this.sendData());
                    });
                }, 1);
            }            
        }.bind(this);

        this.toggleTag = function (tag){
            let curTags = this.state.tags;
            curTags[tag] = !curTags[tag];
            this.setState({
                tags: curTags
            }, () => {
                let tagslist = []
                TAGS.forEach(tag => {
                    if (this.state.tags[tag]){
                        tagslist.push(tag);
                    }
                })
                this.setState({
                    tags_list: tagslist
                })
            })
        }.bind(this);
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
