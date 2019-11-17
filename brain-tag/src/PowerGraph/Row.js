// Channel.js
//@author Rachel 

import React from 'react';
import './Channel.css' // fpor styling of the charts (width, etc.)
import  CanvasJSReact from '../assets/canvasjs.react';
import DynamicLineGraph from '../DynamicLineGraph/DynamicLineGraph.js'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Row extends React.PureComponent {
    render() {  
    return(
        <div  className="row">
            <div className="channelTitle"> 
                {this.props.channelName}
            </div>
            <div className="column"> 
                <DynamicLineGraph 
                    socket={this.props.socket} 
                    secondsToShow={1} 
                    refreshRate={60}
                    channel={this.props.channelName}
                />
            </div>
            <div className="column"> 
                <CanvasJSChart options={this.props.options}></CanvasJSChart>
            </div>
        </div>
        );
    }
  }
  


export default Row;
