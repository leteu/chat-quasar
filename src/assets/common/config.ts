import axios from 'axios';

const API_URL = 'http://172.16.10.103:8082/';
axios.defaults.baseURL = API_URL;

export default API_URL;
