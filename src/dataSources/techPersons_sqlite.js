import * as qsql from '../qtools/qsql.js';

const getTechPersons = async () => {
	return await qsql.getRecordsWithSql('SELECT * FROM techPersons');
}

export default await getTechPersons();