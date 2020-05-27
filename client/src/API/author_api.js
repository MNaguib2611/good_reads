import axios from 'axios'
import {getAuthorSuccess, getAuthorError, getAuthorLoading, getAuthorBooksSuccess} from "../actions/author_action";

export function getAuthorData(dispatch) {
    return (id) => {
        dispatch(getAuthorLoading());
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/authors/${id}`,
            {withCredentials: true}).then(response => {
                // console.log("aaaaaaaaa",response.data)
            if (response.data.data) {
                dispatch(getAuthorSuccess(response.data.data))
                // dispatch(myBooksSuccess(response.data.books, response.data.pages))
            }
        }).catch(error => {
            // console.log(error.response);

            // localStorage.removeItem('loggedUser');
            dispatch(getAuthorError(error.response.data));
        });

    }
}


export function getAuthorBooks(dispatch) {
    return (id) => {
        // dispatch(getAuthorLoading());
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/authors/books/${id}`,
            {withCredentials: true}).then(response => {
            // console.log("aaaaaaaaa",response.data)
            if (response.data.data) {
                dispatch(getAuthorBooksSuccess(response.data.data))
                // dispatch(myBooksSuccess(response.data.books, response.data.pages))
            }
        }).catch(error => {
            // console.log(error.response);

            // localStorage.removeItem('loggedUser');
            // dispatch(getAuthorError(error.response.data));
        });

    }
}
