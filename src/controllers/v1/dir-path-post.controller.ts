import { Controller } from 'tsoa';
import { Request } from 'express';
import * as fs from 'fs';

import { FileDataEntity } from '../../data-entities/file-data-entity'

export class DirPathPostController extends Controller {
    public defaultMethod( req: Request ): Promise<any> {
        return new Promise((resolv, reject) => {
            console.log(`dirPath : ${req.body.dirPath}`)
            const dirPath = req.body.dirPath;
            const fromIndex = req.body.fromIndex;
            const toIndex = req.body.toIndex;
            fs.stat( dirPath, (err, fileStat) => {
                if(err){
                    if(err?.code === 'ENOENT'){
                        reject('Ivalid path (file/direcory does not exist)');
                    }
                } else {
                    if (fileStat.isFile()) {
                        resolv('File found.');
                    } else if (fileStat.isDirectory()) {
                        fs.readdir(req.body.dirPath, { withFileTypes: true }, (err, files) => {
                            if(err) {
                                resolv(err.message);
                            } else {
                                let newList = files.filter(
                                    (value, index) => ((+index >= fromIndex) && (+index < toIndex))
                                ).map((fentry) => {
                                    return this.makeFileDataEntity(fentry);
                                });
                                resolv(newList);
                            }
                        });
                    }
                }
            })
        });
    }

    private makeFileDataEntity(entity: fs.Dirent): FileDataEntity {
        /* create a method that returns a FileDataEntity with all the values */
        let fStats: fs.Stats;
        let fileExt: string;
        let ext = entity.name.split('.').pop();
        if(ext === undefined) {
            fileExt = '';
        } else {
            fileExt = ext;
        }
        try {
            fStats = fs.statSync(`${entity.path}/${entity.name}`);
        }
        catch (error) {
            console.log(`Error getting statSync : ${JSON.stringify(error)}`)
            fStats = new fs.Stats();
        }
        let fdEntity = new FileDataEntity(
            entity.name,
            entity.path,
            fStats.size, // fileSize,
            fileExt,// extension,
            fStats.birthtime.toUTCString(),
            (fStats.mode & parseInt ("777", 8)).toString (8),
//            String(fStats.uid) + String(fStats.gid), // permissions,
            entity.isDirectory()
        );
        return fdEntity;
    }

}