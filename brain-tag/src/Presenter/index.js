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
            page: VIEWS.CHANNELS,
            // Object where keys are all Tag names, values are Bool: whether the tag is toggled "On" or not
            tags: undefined,
            // Bool: T/F whether the current data is being recorded
            record: undefined,
            // Object where keys are all Channel names, values are Bool: whether the channel is toggled "On" or not
            channels: undefined,

            interval: undefined,

            tags_list: [],
            
            timestamp: undefined
        }
        this.initializeChannels = this.initializeChannels.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getData = this.getData.bind(this);
    }

    

    initializeChannels(incomingData){
        let data = DataFormatter.formatIncomingEEG(incomingData);
       // console.log(incomingData);
    //    console.log(data);
        let curChannels = {};
        data['channels'].forEach((value)=> (curChannels[value]=0));
      //  console.log(curChannels);
        this.setState({
            channels: curChannels,
        });
        Services.EEG.removeHandler("data", this.initializeChannels);
    }

    sendData(){
        // let data = {
        //     timestamp: data.timestamp,
        //     channels: data.channels,
        //     tags: data.tags

        // }
         return getDataPointJSON(data1, TAGS, this.state.tags_list);
    }

    getData(data){
        // let data = DataFormatter.formatIncomingEEG(incomingData);
        // data['channels'].forEach(value) =>(curChannels(value)=);
        const points = {
            "channel_1": data.channel_1,
            "channel_2": data.channel_2,
            "channel_3": data.channel_3,
            "channel_4": data.channel_4,

        };
       // console.log(data);
        
    //    console.log(points)

        data1 = {
            channels: points,
            timestamp: data.time,
            tags: this.state.tags
        };
      //  console.log(this.state)
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
                        console.log("emmitting");
                        this.getData(data);
                        store_socket.emit("JSONData", this.sendData());
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
