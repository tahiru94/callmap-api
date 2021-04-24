import { model } from 'mongoose';
import { Request, Response } from 'express';

import CallmapRecordSchema from '../models/callmap-record.model';
import * as utils from '../utils/utils';

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

    // GET Latest Callmap Records for each id
    public getAllLatestCallmapRecords(req: Request, res: Response) {
        CallmapRecord.find({}, (err: any, callmapRecord: any) => {
            if (err) {
                res.status(404).send(err);
            }

            const latestCallmapRecordForAll = utils.default.getLatestCallmapRecordForAll(callmapRecord);
            res.status(200).json(latestCallmapRecordForAll);
        });
    }

    // GET Callmap Record by id
    public getCallmapRecordById(req: Request, res: Response) {
        const { id } = req.params;

        CallmapRecord.find({ id }, (err: any, callmapRecord: any) => {
            if (err) {
                res.status(404).json(err);
            }

            res.status(200).json(callmapRecord);
        });
    }

    // PUT Callmap Record by id
    public updateCallmapRecordById(req: Request, res: Response) {
        const { id } = req.params;
        let newCallmapRecord!: any;

        CallmapRecord.find({ id }, (err: any, callmapRecord: any) => {
            if (err) {
                res.status(404).send(err);
            }

            if (callmapRecord) {
                const latest = utils.default.getLatestCallmapRecord(callmapRecord);

                newCallmapRecord = new CallmapRecord({
                    timestamp: latest.timestamp,
                    firstName: latest.firstName,
                    lastName: latest.lastName,
                    phoneNumber: latest.phoneNumber,
                    callNote: latest.callNote,
                    priority: latest.priority,
                    additionalNotes: [...latest.additionalNotes],
                    ...req.body,
                    version: new Date(),
                    id
                });
            }

            newCallmapRecord.save((err: any, person: any) => {
                if (err) {
                    res.status(404).send(err);
                }

                res.status(200).json(person);
            })
        });
    }

    // GET Callmap Record by priority
    public getLatestCallmapRecordsByPriority(req: Request, res: Response) {
        const { priority } = req.params;
        CallmapRecord.find({ priority: utils.default.titleCase(priority) }, (err: any, callmapRecord: any) => {
            if (err) {
                res.status(404).send(err);
            }

            const latestCallmapRecordForAll = utils.default.getLatestCallmapRecordForAll(callmapRecord);
            res.status(200).json(latestCallmapRecordForAll);
        });
    }
}

export default CallmapRecordController;