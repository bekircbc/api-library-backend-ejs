import axios from 'axios';

const nouns = (
    await axios.get('https://edwardtanguay.netlify.app/share/germanNouns.json')
).data;

export default nouns;