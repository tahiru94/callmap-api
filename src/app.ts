import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import Routes from './routes/callmap-record.route';
import * as config from '../config';

class App {
    public app: Application;
    public apiRoutes: Routes = new Routes();
    public mongoUrl: string = config.default.mongodbUrl;

    constructor() {
        this.app = express();
        this.config();
        this.apiRoutes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
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