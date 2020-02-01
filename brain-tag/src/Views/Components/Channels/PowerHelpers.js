//@author Rachel 

import bci from 'bcijs';


// From my understanding it will give watts/hz
function parsePowerPSD(powerResults, fftSize, sampleRate) {
    //operates on only one channel at a time
    let parsedChannel = []
    for (let i=0; i<powerResults.length; i ++) {
        let point = {label: i*(sampleRate / fftSize) , y: powerResults[i]}
        parsedChannel.push(point)
    }
    return(parsedChannel.slice(0,40*(fftSize / sampleRate)))
}


// helper to make charts options (mostly to save space)
//delta (1-3 Hz), theta (4-7 Hz), alpha (8-12 Hz), beta (13-30 Hz), or gamma (31-50 Hz).
function makeChart(power, channelName) {
    let options = { 
        animationEnabled: true,	
        axisX: {						
            title: "Frequency"
        },
        axisY: {						
            title: "Power"
        },
        toolTip: {
            shared: true
        },
        containerId: {
            channelName
        },
        data: [{				
            type: "spline",
            dataPoints: power
        }]
    }
    return options;
}


// helper to put psds into array for downstream analysis and prettier code
function calcPsdAllChan(chans, channelNames, fftSize, sampleRate) { // chans is an array of all channels
    let charts = {}
    for (let i=0; i<channelNames.length; i++) {
        let chanSig = chans[channelNames[i]]
        console.log("FFTSIZE", fftSize)
        let psd = bci.psd(chanSig, {fftSize : fftSize, truncate : true})
        let parsedPsd = parsePowerPSD(psd, fftSize, sampleRate)
        let psdChart = makeChart(parsedPsd, channelNames[i]);
        charts[channelNames[i]] = psdChart
    }
    return charts
}

export { calcPsdAllChan }