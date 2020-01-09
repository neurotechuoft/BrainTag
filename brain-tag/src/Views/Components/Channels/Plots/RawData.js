// Represents the Real Time EEG Plot

import React, { Component } from 'react';
import CanvasJSReact from '../../../Assets/canvasjs.react';
import PropTypes from 'prop-types';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = []; // data points for graph

export default class DynamicLineChart extends Component {

    constructor(props) {
        super(props);

        this.updateChart = this.updateChart.bind(this);
		this.addEEGHandler = this.props.addEEGHandler.bind(this);
		
		this.initialTime = 0; // time of when first datapoint is received
		this.dataToShow = this.props.secondsToShow * 1000; // amount of data to show
	}

	componentDidMount() {
		// wait for data on socket
        this.addEEGHandler('data', this.updateChart);

        // set interval for rendering
        setInterval(() => {
            this.chart.render();
        }, 1000 / this.props.refreshRate);
    }

    /**
	 * Updates data points 
	 */
    updateChart(data) {
        // sets initialTime for the first data point
        if (this.initialTime === 0) this.initialTime = new Date().getTime() / 1000;
		
        dps.push({x: data["time"] - this.initialTime, y: parseFloat(data[this.props.channel])});

        // since we want to show last x seconds and streaming rate is 1000Hz,
        // the last x seconds have x * 1000 data points
        if (dps.length > this.dataToShow ) {
            dps.shift();
        }
    }

    render() {
        const options = {
            data: [{
                type: "line",
                dataPoints : dps
            }],
            axisY: {
                title: "Magnitude"
            },
            axisX: {
                title: "Time"
            }
        }

        // You can get reference to the chart instance as shown below using onRef. 
        // This allows you to access all chart properties and methods
        return (
            <div>
                <CanvasJSChart 
                    options = {options} 
                    onRef={ref => this.chart = ref}
                />
            </div>
        );
    }
}

DynamicLineChart.propTypes = {
    socket: PropTypes.object,
    secondsToShow: PropTypes.number.isRequired,
    channel: PropTypes.string.isRequired,
    refreshRate: PropTypes.number.isRequired
}
