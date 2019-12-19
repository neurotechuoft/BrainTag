// PSD Plot for a single channel
import React from 'react';
import  CanvasJSReact from '../../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PSD(props){
    return (<CanvasJSChart options={props.options}></CanvasJSChart>);
}