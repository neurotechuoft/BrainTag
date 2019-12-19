import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

class Toggle extends Component {

    constructor(props) {
      super(props);
      this.defaultEnabledBackground = '#5EBA7D';
      this.state = {isEnabled: false};
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(state => ({
        isEnabled: !state.isEnabled
      }));
    }
  
    render() {
        let {children, enabledBackground} = this.props;
        let {isEnabled} = this.state;
        let style = {};
        if (isEnabled) {
            enabledBackground = enabledBackground ? enabledBackground : this.defaultEnabledBackground;
            style={backgroundColor: enabledBackground};
        }
        return(<Button
            className = "ml-3"
            onClick={this.handleClick}
            style={style}>
          {children}
        </Button>);
    }
  }

  export default Toggle;
