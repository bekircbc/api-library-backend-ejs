import * as qfil from '../qtools/qfil.js';
import * as qstr from '../qtools/qstr.js';

const getLandscapePhotos = () => {
    const landscapePhotos = [];
    const pathAndFileNames = qfil.getDirectoryPathAndFileNames('public/images');
    pathAndFileNames.forEach((pathAndFileName) => {
        let fileName = qstr.chopLeft(pathAndFileName, 'public/images');
        fileName = qstr.chopLeft(fileName, '/');
        fileName = qstr.chopLeft(fileName, '\\');

        landscapePhotos.push(fileName);
    });
    return landscapePhotos;
};

export default getLandscapePhotos();
