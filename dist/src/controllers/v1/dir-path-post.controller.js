"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirPathPostController = void 0;
const tsoa_1 = require("tsoa");
const fs = __importStar(require("fs"));
const file_data_entity_1 = require("../../data-entities/file-data-entity");
class DirPathPostController extends tsoa_1.Controller {
    defaultMethod(req) {
        return new Promise((resolv, reject) => {
            console.log(`dirPath : ${req.body.dirPath}`);
            const dirPath = req.body.dirPath.replace(' ', '\ ');
            const fromIndex = req.body.fromIndex;
            const toIndex = req.body.toIndex;
            fs.stat(dirPath, (err, fileStat) => {
                if (err) {
                    if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
                        reject('Ivalid path (file/direcory does not exist)');
                    }
                }
                else {
                    if (fileStat.isFile()) {
                        resolv('File found.');
                    }
                    else if (fileStat.isDirectory()) {
                        fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
                            if (err) {
                                resolv(err.message);
                            }
                            else {
                                let newList = files.filter((value, index) => ((+index >= fromIndex) && (+index < toIndex))).map((fentry) => {
                                    return this.makeFileDataEntity(fentry);
                                });
                                resolv(newList);
                            }
                        });
                    }
                }
            });
        });
    }
    makeFileDataEntity(entity) {
        /* create a method that returns a FileDataEntity with all the values */
        let fStats;
        let fileExt;
        let ext = entity.name.split('.').pop();
        if (ext === undefined) {
            fileExt = '';
        }
        else {
            fileExt = ext;
        }
        try {
            fStats = fs.statSync(`${entity.path}/${entity.name}`);
        }
        catch (error) {
            console.log(`Error getting statSync : ${JSON.stringify(error)}`);
            fStats = new fs.Stats();
        }
        let fdEntity = new file_data_entity_1.FileDataEntity(entity.name, entity.path, fStats.size, // fileSize,
        fileExt, // extension,
        fStats.birthtime.toUTCString(), (fStats.mode & parseInt("777", 8)).toString(8), 
        //            String(fStats.uid) + String(fStats.gid), // permissions,
        entity.isDirectory());
        return fdEntity;
    }
}
exports.DirPathPostController = DirPathPostController;
