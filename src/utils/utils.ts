import {
    groupBy,
    values,
    flattenDeep,
    compact
} from 'lodash';

const getLatestCallmapRecordForAll = (callmapRecord: any[]) => {
    if (callmapRecord && callmapRecord.length) {
        const groupedById = values(groupBy(callmapRecord, 'id'));
        const updatedGroupedById = groupedById.map((group) => {
            const latest = getLatestCallmapRecord(group);
            return latest;
        });
        return compact(flattenDeep(updatedGroupedById));
    }
}

const getLatestCallmapRecord = (callmapRecord: any) => {
    const latest = (callmapRecord).sort((recordA: any, recordB: any) => {
        return recordB.version - recordA.version;
    })[0];

    return latest;
}

export default {
    getLatestCallmapRecordForAll,
    getLatestCallmapRecord
}