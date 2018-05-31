import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://tasty-burger-app.firebaseio.com/'
});

export default instance;