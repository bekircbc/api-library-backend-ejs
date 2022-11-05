import express from 'express';
import { siteData } from './src/models.js';
import cors from 'cors';
import dotenv from 'dotenv';

//////.env lösung for url

dotenv.config();
const baseUrl = process.env.BASE_URL;
const mode = process.env.MODE;
const port = process.env.PORT;
const backendURL = process.env.BACKEND_URL;
/////////////////////////

const app = express();

// const url = `${baseUrl}:${port}`;
// const port = process.env.PORT || 3007;
// const fullUrl = `http://localhost:${port}`;

const url = backendURL;

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Info API</title>
    </head>
    <style>
        body {
            background-color: #aaa;
            padding: 0 0 0 20px;
            font-family: monospace;
            font-size: 1.4rem;
        } 
        a {
            color: #333;
        }
    </style>
    <body>
   <h1>Data API</h1> 
   <ul>
   ${Object.entries(siteData)
		.map((entry) => {
			const idCode = entry[0];
			const data = entry[1];
			const fullUrl = `${url}/${idCode}`;
			return `<li><a href="${fullUrl}">${fullUrl}</a></li>`;
		})
		.join('')}
   </ul>
    </body>
    </html>
    `);
});

for (const entry of Object.entries(siteData)) {
	const idCode = entry[0];
	const data = entry[1];
	app.get('/' + idCode, (req, res) => {
		res.send(data);
	});
}

app.get(`/all`, (req, res) => {
	res.send(siteData);
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
