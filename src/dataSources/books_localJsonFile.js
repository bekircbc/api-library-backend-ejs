import fs from 'fs';

const books = JSON.parse(fs.readFileSync('./src/data/books.json'));

export default books;
