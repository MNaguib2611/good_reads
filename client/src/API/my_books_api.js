import {myBooksSuccess, myBooksError, myBooksLoading, updateBook, updateRate} from "../actions/my_books_action";
import axios from 'axios'
import {getUserData} from "../utils/utils";

export function getMyBooks(dispatch) {
    return (query) => {
        dispatch(myBooksLoading());
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${getUserData()._id}/books${query}`,
            {withCredentials: true}).then(response => {
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
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/users/${getUserData()._id}/books/${book_id}`,
            data:{
                status
            },
            withCredentials: true
        }).then(response => {
            if (response.data) {
                    dispatch(updateBook(response.data))
            }
        }).catch(error => {
            console.log(error);
        });

    }
}

export const rateBook = (dispatch) => {
    return (book_id,rating) => {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/books/${book_id}/rate`,
            data:{
                rating
            },
            withCredentials: true
        }).then(response => {
            dispatch(updateRate(response.data.rate.rating,response.data.avgRate,book_id))
        }).catch(error => {
            console.log(error);
        });

    }
}




