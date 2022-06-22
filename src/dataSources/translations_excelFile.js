import Excel from 'exceljs';

const getTranslations = async () => {
    const wb = new Excel.Workbook();
    await wb.xlsx.readFile('./src/data/googleTranslations.xlsx');
    const translations = [];
    // const ws = wb.getWorksheet('Saved translations');
    const ws = wb.getWorksheet(1);
    for (let row = 2; row <= 100000; row++) {
        const fromLanguageCell = `A${row}`;
        const toLanguageCell = `B${row}`;
        const fromPhraseCell = `C${row}`;
        const toPhraseCell = `D${row}`;

        let fromLanguage = ws.getCell(fromLanguageCell).value;
        let toLanguage = ws.getCell(toLanguageCell).value;
        let fromPhrase = ws.getCell(fromPhraseCell).value;
        let toPhrase = ws.getCell(toPhraseCell).value;
        if (fromLanguage === null) {
            break;
        } else {
            fromLanguage = typeof fromLanguage !== 'string' ? '' : fromLanguage.trim();
            toLanguage = typeof toLanguage !== 'string' ? '' : toLanguage.trim();
            fromPhrase = typeof fromPhrase !== 'string' ? '' : fromPhrase.trim();
            toPhrase = typeof toPhrase !== 'string' ? '' : toPhrase.trim();
            translations.push({
                fromLanguage,
                toLanguage,
                fromPhrase,
                toPhrase
            });
        }
    }
    return translations;
};

export default await getTranslations();