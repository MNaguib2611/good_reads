import axios from 'axios';
import { addBook, retrieveBooks, deleteBook } from '../actions/admin/book';

const domain = 'http://127.0.0.1:5000';

export const bookFormData = (book, fileInput) => {
    const formData = new FormData();
    formData.set('name', book.name);
    formData.set('category', book.category);
    formData.set('author', book.author);
    formData.append('image', fileInput.current.files[0]);
    formData.set('description', book.description);
    return formData;
}

export const add = (book, fileInput, dispatch) => {
    const url = `${domain}/books`;
    const formData = bookFormData(book, fileInput);

    return axios.post(url, formData, {
        withCredentials: true ,
    }).then((res) => {
        dispatch(addBook(res.data));
        return res;
    }).catch((err) => {
        return err;
    });
}

export const edit = (id, book, fileInput) => {
    const url = `${domain}/books/${id}`;
    const formData = bookFormData(book, fileInput);
    
    return axios.put(url, formData, {
        withCredentials: true,
    }).then((res) => {
        return res;
    })
    .catch((err) => {
        return err;
    });
}

export const remove = (id, dispatch) => {
    const url = `${domain}/books/${id}`;
    return axios.delete(url, {
        withCredentials: true,
    }).then((res) => {
        console.log(res);
        dispatch(deleteBook(res.data));
        return res;
    }).catch((err) => {
        return err;
    });
}

export const all = (dispatch) => {
    const url = `${domain}/books/`;
    return axios.get(url, {
        withCredentials: true,
    }).then(res => {
        dispatch(retrieveBooks(res.data));
    }).catch(error => {
        return error;
    });
}

export const book = (id) => {
    const url = `${domain}/books/${id}`;
    return axios.get(url, {
        withCredentials: true,
    }).then(res => {
        return res.data;
    }).catch(error => {
        return error;
    });
}