// Represents a single Channel Row

import React from 'react';
import './index.css';
import RawData from './Plots/RawData';
import PSD from './Plots/PSD';

class Row extends React.PureComponent {
    constructor(props) {
        super(props);
        this.isOpen= true;
      }
    
    changeStatus(){
        this.isOpen = !this.isOpen;
    }

    returnStatus(){
        return this.isOpen ? '&#9660' : '&#9658';
    }

    returnVisibility(){
        return this.isOpen ? 'visibility: visible' : 'visibility: hidden';
    }

    render(){
    
    return(
        <div  className="row">
            <div className="channelTitle" onClick={this.changeStatus()}> 
                {this.returnStatus()+this.props.channelName}
            </div>
            <div className="column" style={this.returnVisibility()}> 
                <RawData
                    addEEGHandler={this.props.addEEGHandler}
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

export default Row;
