import { model } from 'mongoose';
import { Request, Response } from 'express';
import { v4 } from 'uuid';

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
        const newCallmapRecord = new CallmapRecord({ ...req.body, id: v4() });

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

            if (callmapRecord) {
                const latest = utils.default.getLatestCallmapRecord(callmapRecord);
                res.status(200).json(latest);
            }
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
                    additionalNotes: latest.additionalNotes.concat(req.body.additionalNotes),
                    ...utils.default.removeKey(req.body, 'additionalNotes'),
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

    // DELETE Callmap Record by id (latest)
    public deleteCallmapRecordById(req: Request, res: Response) {
        const { id } = req.params;

        CallmapRecord.find({ id }, (err: any, callmapRecord: any) => {
            if (err) {
                res.status(404).send({ success: false, error: err });
            }

            if (!callmapRecord.length) {
                // No Callmap Records found
                res.status(404).json({
                    success: false,
                    id,
                    message: `Could not find Callmap Record with specified id`
                });
            } else {
                if (callmapRecord) {
                    const latest = utils.default.getLatestCallmapRecord(callmapRecord);

                    CallmapRecord.deleteOne({ _id: latest._id }).then(() => {
                        res.status(200).json({
                            success: true,
                            id: latest.id,
                            createdAt: latest.timestamp,
                            latestVersion: latest.version,
                        });
                    });
                } else {
                    res.status(404).json({ success: false });
                }
            }
        });
    }

    // GET Callmap Record by id and version
    public getCallmapRecordByIdAndVersion(req: Request, res: Response) {
        const { id, version } = req.params;

        CallmapRecord.findOne({ id, version }, (err: any, callmapRecord: any) => {
            if (err) {
                res.status(404).json(err);
            }

            res.status(200).json(callmapRecord);
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