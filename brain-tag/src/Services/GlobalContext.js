/* GlobalContext.js
* Binds socket accesssing functions to the context
* @author Rachel 
* @example add these imports and statement at bottom 
* import GlobalContext from 'src/Services/GlobalContext';
* <COMPONENT_NAME>.contextType = GlobalContext;
* call a function with this.context.<FUNCTION>
* call a state variable from this context with this.context.<STATE_VARIABLE>
*/

import React, { Component } from "react";
import PropTypes from 'prop-types';
export const Store = React.createContext();

class GlobalContext extends Component {
    constructor(props) {
        super(props);
        this.state = { // bind state variables here
            test : "TESTING ABILITY TO PASS AROUND GLOBAL CONTEXT",
            sampleRate : 1000,
            intervalSize : 1000,
            refreshRate : 0.25,
            addEEGHandler : this.props.addEEGHandler,
        };
    }

    render() {
        return (
        // this.state more performant than creating new objects
            <Store.Provider value = {this.state}>
                {this.props.children}
            </Store.Provider>
        );
    }
}

//props validation
GlobalContext.propTypes = {
    children: PropTypes.element.isRequired,
    addEEGHandler : PropTypes.element.isRequired,
};

export default GlobalContext;
