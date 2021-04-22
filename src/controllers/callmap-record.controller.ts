import { model } from 'mongoose';
import { Request, Response } from 'express';

import CallmapRecordSchema from '../models/callmap-record.model';

const CallmapRecord = model('CallmapRecord', CallmapRecordSchema);

class CallmapRecordController {
    // GET Callmap Record
    public getAllCallmapRecords(req: Request, res: Response) {
        CallmapRecord.find({}, (err: any, callmapRecord: typeof CallmapRecord) => {
            if (err) {
                res.status(404).json(err);
            }

            res.status(200).json(callmapRecord);
        });
    }

    // POST Callmap Record
    public createCallmapRecord(req: Request, res: Response) {
        const newCallmapRecord = new CallmapRecord(req.body);

        newCallmapRecord.save((err: any, callmapRecord: any) => {
            if (err) {
                res.status(404).json(err);
            }

            res.status(200).json(callmapRecord);
        });
    }
}

export default CallmapRecordController;