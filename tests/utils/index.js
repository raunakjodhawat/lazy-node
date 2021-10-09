import * as fs from 'fs';

const deleteFile = (fileName) => {
    try {
        fs.unlinkSync(fileName);
    } catch (_error) {
    }
}

const randomBoolean = () => {
    return (Math.floor(Math.random() * 2) % 2 == 0);
}
export {
    deleteFile,
    randomBoolean
}