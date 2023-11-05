import { Router } from 'express';
import bodyParser from 'body-parser';

import V1RouterDirPath from './v1/dir-path.route';

class MasterRouter {
    private _router = Router();
    private _subrouterV1DirPath = V1RouterDirPath;

    jsonParser = bodyParser.json({ limit: '1mb' });

    constructor() {
        this._configure();
    }

    private _configure() {
        console.log("in master router");
        this._router.use('/v1', this.jsonParser, this._subrouterV1DirPath);
    }

    get router() {
        return this._router;
    }
}

export = new MasterRouter().router;