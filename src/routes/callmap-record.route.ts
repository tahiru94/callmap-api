import { Application } from 'express';

import CallmapRecordController from '../controllers/callmap-record.controller';

class Routes {
    private callmapRecordController: CallmapRecordController = new CallmapRecordController();

    public routes(app: Application) {
        app.route('/callmap-record')
            .get(this.callmapRecordController.getAllCallmapRecords)
            .post(this.callmapRecordController.createCallmapRecord);
        app.route('/callmap-record/latest')
            .get(this.callmapRecordController.getAllLatestCallmapRecords);
        app.route('/callmap-record/:id')
            .get(this.callmapRecordController.getCallmapRecordById)
            .put(this.callmapRecordController.updateCallmapRecordById)
            .delete(this.callmapRecordController.deleteCallmapRecordById);
        app.route('/callmap-record/priority/:priority')
            .get(this.callmapRecordController.getLatestCallmapRecordsByPriority);
    }
}

export default Routes;