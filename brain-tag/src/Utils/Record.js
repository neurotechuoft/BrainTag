/**
 * Returns a JSON object for a single moment of data, including readings from all channels on the headset.
 *
 * @param data - The JSON structure provided by the socket
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

function notTime(item) {
    return item != 'time';
}

/**
 * Returns a JSON object for a single moment of data, only including readings from 'channels' on the headset.
 *
 * @param data - The JSON structure provided by the socket
 * @param allTags - An array of all possible tags to assign to a data point
 * @param assignedTags - An array of all tags assigned to this data point
 * @param channels - An array of channels which will be found in the new data structure
 * @return string A JSON string containing timestamp, specified channel values, and all tag values
 */
export function getDataPointJSONForChannels(data, allTags, assignedTags, channels) {
    /**
     * JSON STRUCTURE:
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
        if (index > -1) {
            assignedTags.splice(index, 1);
        }
    }

    return JSON.stringify(structure);
}
