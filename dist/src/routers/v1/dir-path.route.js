"use strict";
const express_1 = require("express");
const dir_path_post_controller_1 = require("../../controllers/v1/dir-path-post.controller");
class DirPathRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        console.log('here in dir-path route');
        this._router.post('/dirpath', this._postdirpath);
    }
    _postdirpath(req, res, next) {
        let _dirpathPostController = new dir_path_post_controller_1.DirPathPostController();
        _dirpathPostController.defaultMethod(req).then(resolv => {
            res.status(200).json(resolv);
        }, reason => {
            res.status(503).json(reason);
        }).catch(err => {
            res.status(500).json(err);
        });
    }
}
module.exports = new DirPathRouter().router;
