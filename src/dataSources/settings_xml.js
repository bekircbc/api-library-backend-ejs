import * as qxml from '../qtools/qxml.js';

const getSettings = () => {
	const settingsObject = qxml.getXmlFileAsObject('src/data/settings.xml');
	return settingsObject.elements;
};

export default getSettings();
