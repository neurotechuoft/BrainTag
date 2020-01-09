//@author Rachel 

// helper function to parse signalBandPower() results to be graphed by canvas js 
function parsePower(powerResults) {
    let parsed = []
    for (let i=0; i<powerResults.length; i ++) {
        let channel = powerResults[i]
        let parsedChannel = [
            {label: 'delta', y: channel[0]},
            {label: 'theta', y:  channel[1]},
            {label: 'alpha', y: channel[2]},
            {label: 'beta', y: channel[3]},
            {label: 'gamma', y:  channel[4]}]
        parsed.push(parsedChannel)
    }
    return(parsed)
}

// helper to make charts options (mostly to save space)
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

export {parsePower, makeChart}