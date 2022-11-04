import axios from 'axios';

const products = (await axios.get('http://localhost:3484/api/products')).data;

export default products;
