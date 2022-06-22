import * as qxml from '../qtools/qxml.js';

const getSettings = () => {
    const settingsObject = qxml.getXmlFileAsObject('src/data/settings.xml');
    return settingsObject.settings;
	qxml.get
};

export default getSettings();
