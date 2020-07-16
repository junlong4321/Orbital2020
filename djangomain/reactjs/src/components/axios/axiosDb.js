import axios from 'axios';

const axiosDb = axios.create({
    baseURL: 'https://junlong321.pythonanywhere.com',
});

axiosDb.defaults.headers.common['Authorization'] =
    'Token ' + localStorage.getItem('token');

export default axiosDb;
