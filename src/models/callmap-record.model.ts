import { Schema, SchemaTypes } from 'mongoose';
import { v4 } from 'uuid';

const CallmapRecordSchema = new Schema({
    id: {
        type: String,
        default: v4()
    },
    timestamp: {
        type: Date,
        default: new Date()
    },
    version: {
        type: Date,
        default: new Date()
    },
    firstName: {
        type: String,
        required: 'A first name must be entered for this Callmap record'
    },
    lastName: {
        type: String,
        required: 'A last name must be entered for this Callmap record'
    },
    phoneNumber: {
        type: String,
        required: 'A phone number must be entered for this Callmap record'
    },
    callNote: {
        type: String,
        required: 'A summarized call note / description must be entered for this Callmap record'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low' // Low, Medium, High
    },
    additionalNotes: {
        type: [SchemaTypes.Mixed]
    }
});

export default CallmapRecordSchema;