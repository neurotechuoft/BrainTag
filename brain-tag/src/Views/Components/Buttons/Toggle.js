import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class Toggle extends Component {

    constructor(props) {
      super(props);
      this.text = this.props.text;
      this.bg = this.props.bg;
      this.state = {isToggleOn: true};
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }
  
    render() {
      if(this.state.isToggleOn){
        return(<Button className = "ml-3" onClick={this.handleClick}> {this.text}
        </Button>);
      }
      else{
        return(<Button className = "ml-3"onClick={this.handleClick} style={{ backgroundColor: this.bg}}>
          {this.text}
        </Button>);
      }
    }
  }
  
  export default Toggle;
