// Class to Format incoming and outgoing data from the application.

/**
 * Returns formatted EEG data such that channel names are in an array.
 * 
 * Performance: O(n) for Object.keys() where n is the number of channels
 * 
 * @param EEG - Incoming EEG data. For ex:
 * {"channel_1": number,
 * "channel_2": number,
 * "channel_3": number,
 * "channel_4": number,
 * "time": number}
 * @returns - Formatted EEG data. For ex:
 * {"channels":
 * ["channel_1", "channel_2", "channel_3", "channel_4"],
 * "time": number
 * }
 */
export function formatIncomingEEG(EEG){
    let incomingEEG = {... EEG};
    let timeKey = "time";
    let timestamp = EEG[timeKey];
    delete incomingEEG.timeKey;

    let formattedEEG = {
        channels: Object.keys(incomingEEG),
        time: timestamp
    };

    return formattedEEG;
}

function notTime(item) {
    return item !== 'time';
}

/**
 * Returns a JSON object for a single moment of data, including readings from all channels on the headset.
 *
 * Performance: O(n^2) for the call to the helper method.
 * 
 * @param data - The JSON structure provided by the socket. For ex:
 * {"channel_1": number,
 * "channel_2": number,
 * "channel_3": number,
 * "channel_4": number,
 * "time": number}
 * @param allTags - An array of all possible tags to assign to a data point
 * @param assignedTags - An array of all tags assigned to this data point
 * @return string A JSON string containing timestamp, all channel values, and all tag values
 */
export function getDataPointJSON(data, allTags, assignedTags) {
    // Create list of channels
    if (typeof data == 'string') {
        data = JSON.parse(data);
    }
    let keys = Object.keys(data);
    let channels = keys.filter(notTime);
    return getDataPointJSONForChannels(data, allTags, assignedTags, channels);
}

/**
 * Returns a JSON object for a single moment of data, only including readings from 'channels' on the headset.
 *
 * Performance: O(n^2) for "Add Channels" where n is the number of channels 
 * 
 * @param data - The JSON structure provided by the socket. For ex:
 * {"channel_1": number,
 * "channel_2": number,
 * "channel_3": number, 
 * "channel_4": number,
 * "time": number}
 * @param allTags - An array of all possible tags to assign to a data point
 * @param assignedTags - An array of all tags assigned to this data point
 * @param channels - An array of channels which will be found in the new data structure
 * @return string A JSON string containing timestamp, specified channel values, and all tag values
 */
export function getDataPointJSONForChannels(data, allTags, assignedTags, channels) {
    /**
     * OUTPUT JSON STRUCTURE:
     *
     * {
     *     timestamp:,
     *     channels: { ch1: x,
     *                 ch4: y
     *               },
     *      tags: {t1: 0,
     *             t2: 1}
     * }
     *
     * NOTES: Channels are listed if visible. All tags are listed.
     */
    if (typeof data == 'string') {
        data = JSON.parse(data);
    }

    // Create JSON Structure
    let structure = {
        'timestamp': data.time,
        'channels': {},
        'tags': {}
    };

    // Add Channels
    let keys = Object.keys(data);
    for (let k=0; k<keys.length; k++) {
        let key = keys[k];
        if (channels.indexOf(key) > -1) {
            structure.channels[key] = data[key];
        }
    }

    // Add Tags
    for (let t=0; t < allTags.length; t++) {
        let tag = allTags[t];
        let index = assignedTags.indexOf(tag);
        structure.tags[tag] = (index > -1) ? 1 : 0;
        // if (index > -1) {
        //     assignedTags.splice(index, 1);
        // }
    }

    return JSON.stringify(structure);
}

export default {
    formatIncomingEEG: formatIncomingEEG
}
