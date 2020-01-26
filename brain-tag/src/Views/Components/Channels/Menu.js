// Represents the Menu Overlaying all the channels
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {getRowId} from './Row';

class Menu extends React.PureComponent {

    render() {
        let {channels} = this.props;
        let items = [];
        let list;

        for (let i in channels) {
            let channelName = channels[i];
            items.push(
                <a href={"#" + getRowId(channelName)}>
                    <ListItem button>
                        <ListItemText>{channelName}</ListItemText>
                    </ListItem>
                </a>
            );
        }

        list = (
            <div id="list">
            <List >
                {items}
            </List>
            </div>
        );

        return(list);
    }
}

export {Menu};
