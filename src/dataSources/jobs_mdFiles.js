import * as qfil from '../qtools/qfil.js';
import * as qstr from '../qtools/qstr.js';

const getJobs = () => {
    const jobs = [];
    const jobFileNames = qfil.getDirectoryPathAndFileNames('src/data/jobs');
    jobFileNames.forEach((jobFileName) => {
        const lines = qfil.getFileAsLines(jobFileName);
        const markdown = qstr.convertLinesToStringBlock(lines);
        const html = qstr.parseMarkDown(markdown);

        let idCode = qstr.chopLeft(jobFileName, 'src/data/jobs');
        idCode = qstr.chopLeft(idCode, '/');
        idCode = qstr.chopLeft(idCode, '\\');
        idCode = qstr.chopRight(idCode, '.md');

        jobs.push({
            idCode,
            html
        });
    });
    return jobs;
};

export default getJobs();
