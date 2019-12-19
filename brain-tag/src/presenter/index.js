// Presenter class
import React, {Component} from 'react';
import ChannelView from '../Views/Channel';
import io from 'socket.io-client';

const VIEWS = {
    CHANNELS: "channels"
}

/**
 * Singleton Presenter in MVP Architecture.
 */
class Presenter extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: VIEWS.CHANNELS
        }
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
