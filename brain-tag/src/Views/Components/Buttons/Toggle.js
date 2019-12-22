import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

class Toggle extends Component {

    constructor(props) {
      super(props);
      this.defaultEnabledBackground = '#5EBA7D';
      this.state = {isEnabled: false};
    }

    getStyle() {
        let {enabledBackground} = this.props;
        let {isEnabled} = this.state;
        let style = {};
        if (isEnabled) {
            enabledBackground = enabledBackground ? enabledBackground : this.defaultEnabledBackground;
            style={backgroundColor: enabledBackground};
            style.backgroundColor = enabledBackground;
        }
        return style;
    }

    render() {
        let {children} = this.props;
        let style = this.getStyle();
        return(<Button
            className = "ml-3"
            onClick={this.props.onClick}
            style={style}>
          {children}
        </Button>);
    }
  }

  Toggle.propTypes = {
    children: PropTypes.string.isRequired,
    background: PropTypes.string
  }

  export default Toggle;
