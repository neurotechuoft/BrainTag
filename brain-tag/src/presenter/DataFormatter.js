// Class to Format incoming and outgoing data from the application.

/**
 * Format EEG such that channels are in an array.
 * 
 * Format of incomingEEG:
 * "channel_1": number,
 * "channel_2": number,
 * "channel_3": number,
 * "channel_4": number,
 * "time": number
 */
function FormatIncomingEEG(EEG){
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

export default {
    FormatIncomingEEG: FormatIncomingEEG
}
