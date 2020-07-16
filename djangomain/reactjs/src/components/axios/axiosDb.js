import axios from 'axios';

const axiosDb = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

axiosDb.defaults.headers.common['Authorization'] =
    'Token ' + localStorage.getItem('token');

export default axiosDb;
