import {getDataPointJSON, getDataPointJSONForChannels} from '../DataFormatter';

/* TESTS */

describe("getDataPointJSON", () => {

    const includeAllChannels = true;
    let IO = setupTest(includeAllChannels);

    const NeuroStackData = IO[0];
    const allTags = IO[1];
    const assignedTags = IO[2];
    const expectedResult = IO[4];

    it("returns the expected json", () => {
        expect(getDataPointJSON(NeuroStackData, allTags, assignedTags)).toEqual(expectedResult);
    })

});

describe("getDataPointJSONForChannels", () => {

    const includeAllChannels = false;
    let IO = setupTest(includeAllChannels);

    const NeuroStackData = IO[0];
    const allTags = IO[1];
    const assignedTags = IO[2];
    const channels = IO[3];
    const expectedResult = IO[4];

    it("returns the expected json", () => {
        expect(getDataPointJSONForChannels(NeuroStackData, allTags, assignedTags, channels)).toEqual(expectedResult);
    })

});

/* HELPERS */

let i=0;

function setupTest(includeAllChannels) {

    // CREATE: INPUT FROM NEUROSTACK
    let channel_1 = getRandNumStr(Math.sin);
    let channel_2 = getRandNumStr(Math.cos);
    let channel_3 = getRandNumStr((i) => {return Math.sin(i++) * -0.1});
    let channel_4 = getRandNumStr((i) => {return Math.cos(++i) * -0.5});
    let time = new Date().getTime() / 1000;
    let NeuroStackData = {
        "channel_1": channel_1,
        "channel_2": channel_2,
        "channel_3": channel_3,
        "channel_4": channel_4,
        "time": time
    };

    // CREATE: INPUT FROM BRAINTAG
    // Notice: 'allTags' dictates the order the tags will be shown in the expected result.
    // 'assignedTags' can be any order.
    let allTags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"];
    let assignedTags = ["tag2", "tag1", "tag6"];
    // Notice: 'NeuroStackData' dictates the order the channels will be shown in the expected result.
    // 'channels' can be provided in any order.
    let channels = ["channel_3", "channel_1"];

    // CREATE: EXPECTED OUTPUT
    let expectedJSON;
    if (includeAllChannels) {
        expectedJSON = {
            'timestamp' : time,
            'channels' :  {
                "channel_1": channel_1,
                "channel_2": channel_2,
                "channel_3": channel_3,
                "channel_4": channel_4
            },
            'tags' : {
                "tag1" : 1,
                "tag2" : 1,
                "tag3" : 0,
                "tag4" : 0,
                "tag5" : 0,
                "tag6" : 1
            }
        };
    } else {
        expectedJSON = {
            'timestamp' : time,
            'channels' :  {
                "channel_1": channel_1,
                "channel_3": channel_3
            },
            'tags' : {
                "tag1" : 1,
                "tag2" : 1,
                "tag3" : 0,
                "tag4" : 0,
                "tag5" : 0,
                "tag6" : 1
            }
        };
    }
    let expectedResult = JSON.stringify(expectedJSON);

    // RETURN FUNCTION PARAMETERS & EXPECTED RESULT
    return [NeuroStackData, allTags, assignedTags, channels, expectedResult];
}

function getRandNumStr(func){
    return (func(Math.random()) * 50).toString();
}
