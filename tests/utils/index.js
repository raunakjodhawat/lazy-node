import * as fs from 'fs';
import { exec } from 'child_process';

const deleteFile = (fileName) => {
    try {
        fs.unlinkSync(fileName);
    } catch (_error) {
    }
}

const randomBoolean = () => {
    return (Math.floor(Math.random() * 2) % 2 == 0);
}

const getLastLine = (fileName, cb) => {
    exec(`tail -n 1 ${fileName}`,  (_error, lastLineContent, _stderr) => {
        cb(lastLineContent);
    });
}
export {
    deleteFile,
    randomBoolean,
    getLastLine
}