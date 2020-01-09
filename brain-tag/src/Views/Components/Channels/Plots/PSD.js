// PSD Plot for a single channel
import React from 'react';
import  CanvasJSReact from '../../../Assets/canvasjs.react';
import PropTypes from 'prop-types';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PSD(props){
    return (<CanvasJSChart options={props.options}></CanvasJSChart>);
}

PSD.propTypes = {
    options: PropTypes.object
}