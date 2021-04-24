import { Application } from 'express';

import CallmapRecordController from '../controllers/callmap-record.controller';

class Routes {
    private callmapRecordController: CallmapRecordController = new CallmapRecordController();

    public routes(app: Application) {
        app.route('/v1/callmap-record')
            .get(this.callmapRecordController.getAllCallmapRecords)
            .post(this.callmapRecordController.createCallmapRecord);
        app.route('/v1/callmap-record/latest')
            .get(this.callmapRecordController.getAllLatestCallmapRecords);
        app.route('/v1/callmap-record/id/:id')
            .get(this.callmapRecordController.getCallmapRecordById)
            .put(this.callmapRecordController.updateCallmapRecordById)
            .delete(this.callmapRecordController.deleteCallmapRecordById);
        app.route('/v1/callmap-record/id/:id/version/:version')
            .get(this.callmapRecordController.getCallmapRecordByIdAndVersion);
        app.route('/v1/callmap-record/priority/:priority')
            .get(this.callmapRecordController.getLatestCallmapRecordsByPriority);
    }
}

export default Routes;