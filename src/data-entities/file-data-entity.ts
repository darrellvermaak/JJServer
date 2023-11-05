export class FileDataEntity {
    fileName: string = '';
    fullPath: string = '';
    fileSize: number = 0;
    extension: string = '';
    createdDate: string = '';
    permissions: string = '';
    isDirectory?: boolean = false;

    constructor(
        fileName?: string,
        fullPath?: string,
        fileSize?: number,
        extension?: string,
        createdDate?: string,
        permissions?: string,
        isDirectory?: boolean
    ) {
        this.fileName = fileName == undefined ? '' : fileName;
        this.fullPath = fullPath == undefined ? '' : fullPath;
        this.fileSize = fileSize == undefined ? 0 : fileSize;
        this.extension = extension == undefined ? '' : extension;
        this.createdDate = createdDate == undefined ? '' : createdDate;
        this.permissions = permissions == undefined ? '' : permissions;
        this.isDirectory = isDirectory == undefined ? false : isDirectory;
    }
}