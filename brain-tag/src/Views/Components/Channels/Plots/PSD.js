// PSD Plot for a single channel
import React from 'react';
import PropTypes from 'prop-types';
import Line from 'react-chartjs-2';

export default function PSD(props){
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Power"
                }
            }],
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Frequency"
                }
            }]
        },
        legend: {
            display: false
        }
    };
    let datap;
    let labels;

    if(typeof props.options === 'undefined'){
        labels = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];
        datap = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];
    } else {
        datap = props.options.data;
        labels = props.options.labels;
        // console.log(props.options)
    }
    var data = {
        labels : labels,
        datasets : [{
            type: 'line',
            bezierCurve: false,
            backgroundColor: '#00f',
            borderColor: '#00f',
            fill: false,
            data: datap,
            lineTension: 0
        }]
    };
    return (<Line data={data} options={options} height={70} />);
}

PSD.propTypes = {
    options: PropTypes.object
};
