// Presenter class
import React, {Component} from 'react';
import App from "../App/App";

/**
 * Singleton Presenter in MVP Architecture.
 */
class Presenter extends Component {

    render() {
        return(<App />);
    }

}

export default Presenter;
