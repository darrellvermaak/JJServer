"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDataEntity = void 0;
class FileDataEntity {
    constructor(fileName, fullPath, fileSize, extension, createdDate, permissions, isDirectory) {
        this.fileName = '';
        this.fullPath = '';
        this.fileSize = 0;
        this.extension = '';
        this.createdDate = '';
        this.permissions = '';
        this.isDirectory = false;
        this.fileName = fileName == undefined ? '' : fileName;
        this.fullPath = fullPath == undefined ? '' : fullPath;
        this.fileSize = fileSize == undefined ? 0 : fileSize;
        this.extension = extension == undefined ? '' : extension;
        this.createdDate = createdDate == undefined ? '' : createdDate;
        this.permissions = permissions == undefined ? '' : permissions;
        this.isDirectory = isDirectory == undefined ? false : isDirectory;
    }
}
exports.FileDataEntity = FileDataEntity;
