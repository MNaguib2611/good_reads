import {myBooksSuccess, myBooksError, myBooksLoading,updateBook} from "../actions/my_books_action";
import axios from 'axios'
import {getUserData} from "../utils/utils";

export function getMyBooks(dispatch) {
    return (query) => {
        dispatch(myBooksLoading());
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${getUserData()._id}/books${query}`, {withCredentials: true}).then(response => {
            if (response.data.books && response.data.pages) {
                dispatch(myBooksSuccess(response.data.books, response.data.pages))
            }
        }).catch(error => {
            console.log(error);
            dispatch(myBooksError(error.response.data));
        });

    }
}


export function updateBookStatus(dispatch) {
    return (book_id,status) => {
        dispatch(myBooksLoading());
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/users/${getUserData()._id}/books/${book_id}`,
            data:{
                status
            },
            withCredentials: true
        }).then(response => {
            // console.log(response.data)
            if (response.data) {
                dispatch(updateBook(response.data))
            }
        }).catch(error => {
            console.log(error);
            // dispatch(myBooksError(error.response.data));
        });

    }
}



