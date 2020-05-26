import axios from 'axios';
import { addBook, retrieveBooks, deleteBook } from '../actions/admin/book';

export const bookFormData = (book, fileInput) => {
    const formData = new FormData();
    formData.set('name', book.name);
    formData.set('category', book.category);
    formData.set('author', book.author);
    formData.append('image', fileInput.current.files[0]);
    formData.set('description', book.description);
    return formData;
}

export const add = (url, book, fileInput, dispatch) => {
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

export const edit = (url, book, fileInput) => {
    const formData = bookFormData(book, fileInput);
    
    return axios.put(url, formData, {
        withCredentials: true ,
    }).then((res) => {
        return res;
    })
    .catch((err) => {
        return err;
    });
}

export const remove = (url, dispatch) => {
    return axios.delete(url, {
        withCredentials: true ,
    }).then((res) => {
        console.log(res);
        dispatch(deleteBook(res.data));
        return res;
    }).catch((err) => {
        return err;
    });
}

export const all = (dispatch) => {
    return axios.get('http://127.0.0.1:5000/books/').then(res => {
        dispatch(retrieveBooks(res.data));
    }).catch(error => {
        console.log(error);
    });
}