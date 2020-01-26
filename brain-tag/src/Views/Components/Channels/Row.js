// Represents a single Channel Row

import React from 'react';
import './index.css';
import RawData from './Plots/RawData';
import PSD from './Plots/PSD';

class Row extends React.PureComponent {

    render() {
        let {channelName, addEEGHandler, options} = this.props;

        let name = (
            <div className="channelTitle">
                {channelName}
            </div>
        );
        let rawDataPlot = (
            <div className="column">
                <RawData
                addEEGHandler={addEEGHandler}
                secondsToShow={1}
                refreshRate={60}
                channel={channelName}
                />
            </div>
        );
        let psdPlot = (
            <div className="column">
                <PSD options={options} />
            </div>
        );

        return(
            <div  id={getRowId(channelName)} className={getRowClass()}>
                {name}
                {rawDataPlot}
                {psdPlot}
            </div>
        );
    }
  }

  function getRowId(channelName) {
      return "channel-" + channelName;
  }

  function getRowClass() {
      return "row";
  }

export {Row, getRowId, getRowClass};
