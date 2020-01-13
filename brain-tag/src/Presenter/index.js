// Presenter class
import React, {Component} from 'react';
import ChannelView from '../Views/Channel';
import {VIEWS, TAGS} from './Constants';
import Services from '../Services';
import DataFormatter, { getDataPointJSON } from './DataFormatter';

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
            channels: undefined,

            interval: undefined,

            tags_list: []
        }
        this.initializeChannels = this.initializeChannels.bind(this);
        this.sendData = this.sendData.bind(this);
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

    sendData(){
         return getDataPointJSON(this.state.channels, TAGS, this.state.tags_list);
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

        this.toggleRecord = function (){
            this.setState({
                record: !this.state.record
            }, () => {
                if (!this.state.record){
                    clearInterval(this.state.interval)
                }
                else{
                    this.state.interval = setInterval(() => {
                        Services.Storage.emitHandler("JSONData", this.sendData());
                    }, 1);
                }
            })
            
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
                <ChannelView
                    addEEGHandler={Services.EEG.addHandler}
                    tags={this.state.tags}
                    isRecord={this.state.record}
                    onRecordToggle={this.toggleRecord}
                    onTagToggle={this.toggleTag} />
            );
        }
        return "";
    }

}

export default Presenter;
