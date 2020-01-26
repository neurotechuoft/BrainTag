import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

export default class Toggle extends Component {
    constructor(props) {
        super(props);
        this.defaultEnabledBackground = '#5EBA7D';
    }

    getStyle() {
        let {enabledBackground, isEnabled} = this.props;
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
    enabledBackground: PropTypes.string,
    isEnabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

