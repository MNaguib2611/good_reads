// Handle author's operations
import axios from 'axios';

const domain = 'http://127.0.0.1:5000';

export const all = () => {
    const url = `${domain}/authors/`;
    return axios.get(url,{
        withCredentials: true
    }).then(authors => {
        return authors.data.data;
    }).catch(error => {
        return error;
    });
};