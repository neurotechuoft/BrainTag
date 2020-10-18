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
class Presenter extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: VIEWS.CHANNELS,
            // Object where keys are all Tag names, values are Bool: whether the tag is toggled "On" or not
            tags: {"Up": false, "Down": false, "Left": false, "Right": false},
            // Bool: T/F whether the current data is being recorded
            record: false,
            // Object where keys are all Channel names, values are Bool: whether the channel is toggled "On" or not
            channels: undefined
        }
        this.initializeChannels = this.initializeChannels.bind(this);

        this.toggleRecord = function (){
            this.setState({
                record: !this.state.record
            })
        }.bind(this);

        this.toggleTag = function (tag){
            let curTags = this.state.tags;
            curTags[tag] = !curTags[tag];
            this.setState({
                tags: curTags
            })
        }.bind(this);

        this.handleStorage = this.handleStorage.bind(this)
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

    handleStorage(data) {
        // console.log("TEST TAGS", this.state.tags)
        const d = {
            //add timestamp
            timestamp: data.time,
            channels:{
            "channel_1": data.channel_1,
            "channel_2": data.channel_2,
            "channel_3": data.channel_3,
            "channel_4": data.channel_4
            },
            tags: this.state.tags,
            record: this.state.record
        }
        Services.Storage.emitHandler(d)

    }

    componentDidMount(){
        //let record = false;
        //let curTags = {};
        //TAGS.forEach((value)=> (curTags[value]=false));
        // this.setState({
        //     tags: curTags,
        //     record: record
        // });
        Services.EEG.addHandler("data", this.initializeChannels);

        // this.toggleRecord = function (){
        //     this.setState({
        //         record: !this.state.record
        //     })
        // }.bind(this);

        // this.toggleTag = function (tag){
        //     let curTags = this.state.tags;
        //     curTags[tag] = !curTags[tag];
        //     this.setState({
        //         tags: curTags
        //     })
        // }.bind(this);
    }

    render() {
        if(this.state.page === VIEWS.CHANNELS){
            return (
                <ContextProvider addEEGHandler={Services.EEG.addHandler}>
                    <ChannelView
                        tags={this.state.tags}
                        isRecord={this.state.record}
                        onRecordToggle={this.toggleRecord}
                        onTagToggle={this.toggleTag} 
                        handleStorage={this.handleStorage}
                        addEEGHandler={Services.EEG.addHandler} />
                </ContextProvider>
            );
        }
        return "";
    }

}

export default Presenter;
