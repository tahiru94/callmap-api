import { Request, Response, Application } from 'express';

class Routes {
    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({ message: 'GET request successful' });
            });
    }
}

export default Routes;