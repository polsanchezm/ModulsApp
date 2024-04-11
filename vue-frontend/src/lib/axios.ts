import Axios from 'axios';

// cridem a la api de laravel
const axios = Axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    withXSRFToken: true
});

export default axios;
