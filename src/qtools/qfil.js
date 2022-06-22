import fs from 'fs';
import * as qstr from './qstr.js';
import * as qfil from './qfil.js';
import * as qsys from './qsys.js';
import { parse } from 'csv-parse';

/**
 * Get array of files from a directory, non-recursive.
 * 
 * const files = qfil.getDirectoryPathAndFileNames('public/images');
 * 
 * [
 * 'public/images/field.jpg',
 * 'public/images/forest.jpg',
 * 'public/images/sunset.jpg'
]
 */
export const getDirectoryPathAndFileNames = (path) => {
	let result = [];
	let fileNamesInPath = fs.readdirSync(path);
	fileNamesInPath.forEach((fileName) => {
		let filePath = path + '/' + fileName;
		if (!fs.statSync(filePath).isDirectory()) {
			let filePath = path + '/' + fileName;
			result.push(filePath);
		}
	});
	return result;
};

/**
 * Get the content of a text file as string with newline characters.
 *
 * const fileContent = qfil.getContentOfFile('src/data/jobs/job0001.md');
 *
 * "# Frontend Developer\n
 * \n
 *  ## Skills\n
 * \n
 *  - HTML/CSS/JavaScript\n
 *  - React"
 */
export const getFileAsStringBlock = (pathAndFileName) => {
	const fullPathAndFileName =
		qsys.buildSystemAbsolutePathAndFileName(pathAndFileName);
	return fs.readFileSync(fullPathAndFileName, 'utf8');
};

/**
 * Get the content of a text file as array of strings, one string for each line.
 *
 * const lines = qfil.getFileAsLines('src/data/jobs/job0001.md');
 *
 * [
 *   "# Frontend Developer",
 *   "",
 *   "## Skills",
 *   "",
 *   "- HTML/CSS/JavaScript",
 *   "- React"
 * ]
 */
export const getFileAsLines = (pathAndFileName) => {
	const fileContent = qfil.getFileAsStringBlock(pathAndFileName);
	return qstr.convertStringBlockToLines(fileContent);
};

/**
 * Returns records from a CSV file.
 *
 * const records = await qfil.getRecordsFromCsvFile('src/data/employees_commas.csv');
 * const records = await qfil.getRecordsFromCsvFile('src/data/employees_semicolons.csv', ';');
 */
export const getRecordsFromCsvFile = (pathAndFileName, delimiter = ',') => {
	return new Promise((resolve, reject) => {
		const parser = parse(
			{ columns: true, delimiter },
			function (err, records) {
				if (records === undefined) {
					reject(err);
				} else if (records.length === 0) {
					resolve([]);
				} else {
					resolve(records);
				}
			}
		);
		fs.createReadStream(
			qsys.buildSystemAbsolutePathAndFileName(pathAndFileName)
		).pipe(parser);
	});
};
