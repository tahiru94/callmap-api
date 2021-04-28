import { Application } from 'express';

import UserNoteController from '../controllers/user-note.controller';

class UserNoteRoutes {
    private userNoteController: UserNoteController = new UserNoteController();

    public routes(app: Application) {
        app.route('/v1/user-note')
            .get(this.userNoteController.getAllNotes)
            .post(this.userNoteController.createUserNote);
    }
}

export default UserNoteRoutes;