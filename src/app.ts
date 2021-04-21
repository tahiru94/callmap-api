import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
    }
}

export default App;