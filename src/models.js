import nouns from './dataSources/nouns_apiCall.js';
import books from './dataSources/books_localJsonFile.js';
import techPersons from './dataSources/techPersons_sqlite.js';
import settings from './dataSources/settings_xml.js';
import employees from './dataSources/employees_csv.js';
import translations from './dataSources/translations_excelFile.js';
import jobs from './dataSources/jobs_mdFiles.js';
import landscapePhotos from './dataSources/images_landscapePhotos.js';

export const siteData = {
    nouns,
    books,
    techPersons,
    settings,
    employees,
    translations,
    jobs,
    landscapePhotos
};
