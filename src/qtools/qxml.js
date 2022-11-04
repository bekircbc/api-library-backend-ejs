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
	const xmlAsText = fs.readFileSync(fullPathAndFileName, 'utf8');
	const xmlAsJson = pkg.xml2json(xmlAsText, options);

	const xmlAsObject = JSON.parse(xmlAsJson);
	return xmlAsObject;
};
