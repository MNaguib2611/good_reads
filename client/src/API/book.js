import axios from 'axios';
import { addBook, retrieveBooks, deleteBook } from '../actions/admin/book';

export const domain = `${process.env.REACT_APP_BACKEND_URL}`;

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
        withCredentials: true
    }).then(res => {
        if(res.data)
            return res;
    }).catch(error => {
        return error;
    });
}

export const updateBookStatus = (userId, bookId, status) => {
    return axios({
        method:'post',
        url:`${domain}/users/${userId}/books/${bookId}`,
        data:{
            status
        },
        withCredentials: true
    }).then(response => {
        if (response.data) {
            console.log(response);
            return response;
        }else {
            const error = 'Something went wrong';
            return {
                error
            }
        }
    }).catch(error => {
        console.log(error);
    });
}

export const rateBook = (bookId, rating) => {
    return axios({
        method:'post',
        url:`${domain}/books/${bookId}/rate`,
        data:{
            rating
        },
        withCredentials: true
    }).then(response => {
        if (response.data) {
            console.log(response);
            return response;
        }else {
            const error = 'Something went wrong';
            return {
                error
            }
        }
    }).catch(error => {
        console.log(error);
        return error;
    });
}