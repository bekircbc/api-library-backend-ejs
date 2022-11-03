import axios from 'axios';

const products = (
	await axios.get('https://teknoza-backend.bscebeci.de/api/products')
).data;

export default products;
