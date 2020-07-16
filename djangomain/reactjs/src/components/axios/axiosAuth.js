import axios from 'axios';

const axiosAuth = axios.create({
    baseURL: 'https://junlong321.pythonanywhere.com',
});

export default axiosAuth;
