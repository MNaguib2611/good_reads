import {myBooksSuccess, myBooksError, myBooksLoading} from "../actions/my_books_action";
// import {BASE_URL} from "../../utils/constants";
import axios from 'axios'
export function getMyBooks(dispatch) {
    return (query) => {
        console.log(query)
        dispatch(myBooksLoading());
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BACKEND_URL}/users/5eb5cab85904e32858dd4249/books${query}`,
        }).then((response) => {
            console.log(response.data,"kkkkkkkkkkkk")
            dispatch(myBooksSuccess(response.data.books,response.data.pages))
        }).catch((error) => {
            console.log(error.response.data,"kkkkkkkkkkkk")
            dispatch(myBooksError(error.response.data));
        })
    }
};