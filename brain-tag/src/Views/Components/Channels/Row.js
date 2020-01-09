// Represents a single Channel Row

import React from 'react';
import './index.css';
import RawData from './Plots/RawData';
import PSD from './Plots/PSD';
import PropTypes from 'prop-types';

export default class Row extends React.PureComponent {
    render() {  
        return(
            <div  className="row">
                <div className="channelTitle"> 
                    {this.props.channelName}
                </div>
                <div className="column"> 
                    <RawData 
                        socket={this.props.socket} 
                        secondsToShow={1} 
                        refreshRate={60}
                        channel={this.props.channelName}
                    />
                </div>
                <div className="column"> 
                    <PSD options={this.props.options} />
                </div>
            </div>
        );
    }
}

Row.propTypes = {
    socket: PropTypes.object,
    options: PropTypes.object,
    channelName: PropTypes.string.isRequired
}
