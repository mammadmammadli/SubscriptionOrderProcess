import axios from 'axios';

export const Axios = axios.create({
    baseURL: "https://cloud-storage-prices-moberries.herokuapp.com",
    timeout: 10000,
});