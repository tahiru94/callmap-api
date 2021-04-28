import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import CallmapRecordRoutes from './routes/callmap-record.route';
import UserNoteRoutes from './routes/user-note.route';
import * as config from '../config';

class App {
    public app: Application;
    public mongoUrl: string = config.default.mongodbUrl;

    // Routes
    public callmapRecordRoutes: CallmapRecordRoutes = new CallmapRecordRoutes();
    public userNoteRoutes: UserNoteRoutes = new UserNoteRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.assignRoutes();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
    }

    private assignRoutes(): void {
        this.callmapRecordRoutes.routes(this.app);
        this.userNoteRoutes.routes(this.app);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}

export default App;