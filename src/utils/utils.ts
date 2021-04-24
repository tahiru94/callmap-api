import {
    groupBy,
    values,
    flattenDeep,
    compact
} from 'lodash';

const getLatestCallmapRecord = (callmapRecord: any) => {
    const latest = (callmapRecord).sort((recordA: any, recordB: any) => {
        return recordB.version - recordA.version;
    })[0];

    return latest;
}

export default {
    getLatestCallmapRecord
}