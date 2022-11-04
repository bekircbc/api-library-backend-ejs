import fs from 'fs';
import * as qsys from './qsys.js';
import pkg from 'xml-js';

/**
 * Convert XML file to JavaScript object.
 *
 * const obj = qxml.getXmlFileAsObject('src/data/settings.xml');
 *
 * {
 *   settings: {
 *     type: 'jdbc-mysql',
 *     user: 'sbanks',
 *     password: '123',
 *   }
 * }
 */

const options = { ignoreComment: true, alwaysChildren: true };

export const getXmlFileAsObject = (pathAndFileName) => {
	const fullPathAndFileName =
		qsys.buildSystemAbsolutePathAndFileName(pathAndFileName);
	console.log(fullPathAndFileName);
	const xmlAsText = fs.readFileSync(fullPathAndFileName, 'utf8');
	console.log(xmlAsText);
	const xmlAsJson = pkg.xml2json(xmlAsText, options);
	console.log(xmlAsJson);

	const xmlAsObject = JSON.parse(xmlAsJson);
	console.log(xmlAsObject);
	return xmlAsObject;
};
