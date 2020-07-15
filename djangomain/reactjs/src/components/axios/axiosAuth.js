import axios from 'axios';

const axiosAuth = axios.create({
    baseURL: 'http://junlong321.pythonanywhere.com',
});

export default axiosAuth;
