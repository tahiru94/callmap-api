import { Request, Response, Application } from 'express';

class Routes {
    public routes(app: Application) {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200)
                    .send({ message: 'GET / successful' });
            });
        app.route('/callmap-record')
            .get((req: Request, res: Response) => {
                res.status(200)
                    .send({ message: 'GET /callmap-record successful' });
            });
    }
}

export default Routes;