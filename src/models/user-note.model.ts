import { Schema } from 'mongoose';
import { v4 } from 'uuid';

const UserNoteSchema = new Schema({
    id: {
        type: String,
        default: v4(),
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    body: {
        type: String,
        required: 'A note body must be entered for this User Note',
    },
    labels: {
        type: [String],
    }
});

export default UserNoteSchema;