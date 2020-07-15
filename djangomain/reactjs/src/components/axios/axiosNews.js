import axios from 'axios';

const axiosNews = axios.create({
    baseURL:
        'https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=',
});

export default axiosNews;
