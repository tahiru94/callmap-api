import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';

import Routes from './routes/callmap.route';

class App {
    public app: Application;
    public apiRoutes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.apiRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
    }
}

export default new App().app;