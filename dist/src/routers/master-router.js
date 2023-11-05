"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const dir_path_route_1 = __importDefault(require("./v1/dir-path.route"));
class MasterRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._subrouterV1DirPath = dir_path_route_1.default;
        this.jsonParser = body_parser_1.default.json({ limit: '1mb' });
        this._configure();
    }
    _configure() {
        console.log("in master router");
        this._router.use('/v1', this.jsonParser, this._subrouterV1DirPath);
    }
    get router() {
        return this._router;
    }
}
module.exports = new MasterRouter().router;
