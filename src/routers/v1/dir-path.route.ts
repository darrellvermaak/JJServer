import { Router, Request, Response, NextFunction } from 'express';
import { DirPathPostController } from '../../controllers/v1/dir-path-post.controller';

class DirPathRouter {
    private _router = Router();

    constructor() {
        this._configure();
    }

    get router() {
        return this._router;
    }

    private _configure() {
        console.log('here in dir-path route');
        this._router.post('/dirpath', this._postdirpath);
    }

    private _postdirpath(req: Request, res: Response, next: NextFunction) {
        let _dirpathPostController = new DirPathPostController();
        _dirpathPostController.defaultMethod(req).then(
            resolv => {
                res.status(200).json(resolv);
            },
            reason => {
                res.status(503).json(reason);
            }
        ).catch(err => {
            res.status(500).json(err);
        })
    }

}

export = new DirPathRouter().router;