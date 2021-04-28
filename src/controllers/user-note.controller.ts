import { model } from 'mongoose';
import { Request, Response } from 'express';
import { v4 } from 'uuid';

import UserNoteSchema from '../models/user-note.model';

const UserNote = model('UserNote', UserNoteSchema);

class UserNoteController {
    public getAllNotes(req: Request, res: Response) {
        UserNote.find({}, (err: any, userNote: any) => {
            if (err) {
                res.status(404).json(err);
            }

            res.status(200).json(userNote);
        });
    }

    public createUserNote(req: Request, res: Response) {
        const newUserNote = new UserNote({ ...req.body, id: v4() });

        newUserNote.save((err: any, userNote: any) => {
            if (err) {
                res.status(404).json(err);
            }

            res.status(200).json(userNote);
        });
    }
}

export default UserNoteController;