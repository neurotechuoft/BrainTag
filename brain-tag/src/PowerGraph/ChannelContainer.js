// ChannelContainer.js
// @author Rachel 

import React, {Component} from 'react';
import './Channel.css' // fpor styling of the charts (width, etc.)
import {parsePower, makeChart} from './powerHelpers.js'
import Row from './Row.js'
import bci from 'bcijs';

class ChannelContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket : this.props.socket,
            bands: ['delta',  'theta', 'alpha',  'beta',  'gamma'], 
            sampleRate : this.props.sampleRate, //WARNING: HARDCODED 
            intervalSize :  this.props.intervalSize,
            hasError: false, //see component did catch
            //record last 1s from socket 
            sig1: [],
            sig2: [],
            sig3: [],
            sig4: [],


            chart1 : undefined,
            chart2 : undefined,
            chart3 : undefined,
            chart4 : undefined,  
      }
      this.bindInterval = this.bindInterval.bind(this);
    }

    async componentDidMount() {
        this.bindInterval() 
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.log("ERROR", error, info);
    }

    bindInterval () {
        if (this.state.socket) {
        this.state.socket.on("data", (data, callback) => {
                // updates every second, can change, see hard coded at top 
                var checkSize = (this.state.sig1).push(parseFloat(data.channel_1)); 
                (this.state.sig2).push(parseFloat(data.channel_2));
                (this.state.sig3).push(parseFloat(data.channel_3));
                (this.state.sig4).push(parseFloat(data.channel_4));

                // UPDATES EVERY SECOND, FOR AVERAEG RATE
                if (checkSize % this.state.intervalSize === 0) { //so it only stores the last 1s of data 
                    // Gets band power over last second and binds it to this.state.power1, (for future graphing)
                    let parsedPower = parsePower([bci.signalBandPower(this.state.sig1, this.state.sampleRate, this.state.bands), 
                                                bci.signalBandPower(this.state.sig2, this.state.sampleRate, this.state.bands), 
                                                bci.signalBandPower(this.state.sig3, this.state.sampleRate, this.state.bands),
                                                bci.signalBandPower(this.state.sig4, this.state.sampleRate, this.state.bands)]);
                    
                    // Represents different channels, each channel charts 5 bands 
                    let chart1 = makeChart(parsedPower[0], "1");
                    let chart2 = makeChart(parsedPower[1], "2");
                    let chart3 = makeChart(parsedPower[2], "3");
                    let chart4 = makeChart(parsedPower[3], "4");

                    this.setState({
                        chart1 : chart1, chart2 : chart2, chart3 : chart3, chart4 : chart4, 
                        sig1 : [], sig2 : [], sig3 : [], sig4 : [], 
                    })
                }
        })}
    }

    render() {
    if (this.state.hasError) {
        return <h1>Please run dummy server on port 8005. </h1>;
    }
    return(
        <div> 
            { (this.state.chart1 && this.state.chart2 && this.state.chart3 && this.state.chart4) &&
            <div> 
                <Row channelName="channel_1" options={this.state.chart1} socket={this.props.socket}></Row> 
                <Row channelName="channel_2" options={this.state.chart2} socket={this.props.socket}></Row> 
                <Row channelName="channel_3" options={this.state.chart3} socket={this.props.socket}></Row> 
                <Row channelName="channel_4" options={this.state.chart4} socket={this.props.socket}></Row> 
            </div>
            }
        </div>
        )
    }
}

export default ChannelContainer;