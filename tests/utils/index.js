import * as fs from 'fs';

const deleteFile = (fileName) => {
    try {
        fs.unlinkSync(fileName);
    } catch (_error) {
    }
}

export {
    deleteFile
}