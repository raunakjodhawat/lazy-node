import * as fs from 'fs';
import * as path from 'path';

const deleteFile = (fileName: string) => {
    try {
        fs.unlinkSync(path.resolve(fileName));
    } catch (_error) {
    } finally {
        return;
    }
}

const randomBoolean = () => {
    return (Math.floor(Math.random() * 2) % 2 == 0);
}

const doesFileContain = (fileName: string, searchKey: string, cb: Function) => {
    console.warn(path.resolve("stdout.log"));
    fs.readFile(path.resolve(fileName), (_error, data) => {
        console.warn(_error);
        cb(data.includes(searchKey));
    });
}

export {
    deleteFile,
    randomBoolean,
    doesFileContain
}