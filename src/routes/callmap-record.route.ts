import { Application } from 'express';

import CallmapRecordController from '../controllers/callmap-record.controller';

class Routes {
    private callmapRecordController: CallmapRecordController = new CallmapRecordController();

    public routes(app: Application) {
        app.route('/callmap-record')
            .get(this.callmapRecordController.getAllCallmapRecords)
            .post(this.callmapRecordController.createCallmapRecord);
    }
}

export default Routes;