import express from 'express';
import { siteData } from './src/models.js';
import cors from 'cors';

//////.env lösung for url

import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.BASE_URL;
const mode = process.env.MODE;
const port = process.env.PORT;

/////////////////////////

const app = express();

const url = mode === 'development' ? `${baseUrl}:${port}` : baseUrl;
// const port = process.env.PORT || 3007;
// const fullUrl = `http://localhost:${port}`;

// const fullUrl = `https://api-library-backend-ejs.herokuapp.com`;

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
	res.send(`
   <!DOCTYPE html>
   <html lang="en">
   <head>
    <title>Info API</title>
   <style>
    body {
        background-color: #ccc;
        font-family: monospace;
        font-size: 1.5rem;
    }
    a {
        color: #777;
    }
   </style>
   </head>
   <body>
   <h1>Info API</h1>  
   <ul>
   <li><a href="${url}/all">${url}/all</a></li>
   ${Object.keys(siteData)
		.map((key) => {
			return `<li><a href="${url}/${key}">${url}/${key}</a></li>`;
		})
		.join('')}
   </ul>
   </body>
   </html> 
    `);
});

Object.entries(siteData).forEach((entry) => {
	const key = entry[0];
	const value = entry[1];
	app.get(`/${key}`, (req, res) => {
		res.send(value);
	});
});

app.get(`/all`, (req, res) => {
	res.send(siteData);
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
