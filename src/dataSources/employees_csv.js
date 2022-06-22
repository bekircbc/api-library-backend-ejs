import * as qfil from '../qtools/qfil.js';

const getEmployees = async () => {
	const commaRecords = await qfil.getRecordsFromCsvFile('src/data/employees_commas.csv');
	const semicolonRecords = await qfil.getRecordsFromCsvFile('src/data/employees_semicolons.csv', ';');
	const records = commaRecords.concat(semicolonRecords);
	return records;
}

export default await getEmployees();
