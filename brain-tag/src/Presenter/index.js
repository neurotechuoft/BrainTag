// Presenter class
import React, {Component} from 'react';
import ChannelView from '../Views/Channel';
import {VIEWS, TAGS} from './Constants';
import Services from '../Services';
<<<<<<< Updated upstream
import DataFormatter from './DataFormatter';
=======
import DataFormatter, { getDataPointJSON } from './DataFormatter';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            channels: undefined
        }
        this.initializeChannels = this.initializeChannels.bind(this);
=======
            channels: undefined,

            interval: undefined
        }
        this.initializeChannels = this.initializeChannels.bind(this);
        this.sendData = this.sendData.bind(this);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
    sendData(){
         return getDataPointJSON(this.state.channels, TAGS, this.state.tags);
    }

>>>>>>> Stashed changes
    componentDidMount(){
        let record = false;
        let curTags = {};
        TAGS.forEach((value)=> (curTags[value]=false));
        this.setState({
            tags: curTags,
            record: record
        });
<<<<<<< Updated upstream
        Services.EEG.addHandler("data", this.initializeChannels);

        this.toggleRecord = function (){
            this.setState({
                record: !this.state.record
            })
=======
        Services.EEG.addHandler("data", this.initializeChannels);        

        this.toggleRecord = function (){
            if (this.state.record){
                clearInterval(this.state.interval)
            }
            this.setState({
                record: !this.state.record
            }, () => {
                console.log("here");
                this.interval = setInterval(() => {
                    Services.Storage.emitHandler("JSONData", this.sendData());
                }, 1);
            })
            
>>>>>>> Stashed changes
        }.bind(this);

        this.toggleTag = function (tag){
            let curTags = this.state.tags;
            curTags[tag] = !curTags[tag];
            this.setState({
                tags: curTags
<<<<<<< Updated upstream
            })
        }.bind(this);
    }
=======
            }, () => {
                console.log(this.state.tags)
            })
        }.bind(this);
    }
    
>>>>>>> Stashed changes

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
