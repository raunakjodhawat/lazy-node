import * as fs from 'fs';
import { exec } from 'child_process';

const deleteFile = (fileName: string) => {
    try {
        fs.unlinkSync(fileName);
    } catch (_error) {
    }
}

const randomBoolean = () => {
    return (Math.floor(Math.random() * 2) % 2 == 0);
}

const getLastLine = (fileName: string, cb: Function) => {
    exec(`tail -n 1 ${fileName}`,  (_error, lastLineContent, _stderr) => {
        cb(lastLineContent);
    });
}
const doesFileContain = (fileName: string, searchKey: string, cb: Function) => {
    fs.readFile(fileName, (_error, data) => {
        cb(data.includes(searchKey));
    });
}

export {
    deleteFile,
    randomBoolean,
    getLastLine,
    doesFileContain
}