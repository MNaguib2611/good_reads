import {myBooksSuccess, myBooksError, myBooksLoading} from "../actions/my_books_action";
// import {BASE_URL} from "../../utils/constants";
import axios from 'axios'
export function getMyBooks(dispatch) {
    return (query) => {
        console.log(query)
        dispatch(myBooksLoading());
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/5eb36fdd4c430a63c3c3a788`,{withCredentials: true}).then(response => {
            if (response.data.user) {
                console.log("mmmmmmmm",response.data)
              }
            }).catch(err => {
                // setLoggedUser(false);
                console.log(err);
          });
        // axios({
        //     method: 'get',
        //     url: `${process.env.REACT_APP_BACKEND_URL}/users/5eb36fdd4c430a63c3c3a788/books${query}`,
        // },{withCredentials: true}).then(response => {
        //     console.log(response.data)
        //     // console.log(response.data,"kkkkkkkkkkkk")
        //     dispatch(myBooksSuccess(response.data.books,response.data.pages))
        // }).catch(error => {
        //     console.log(error)
        //     // dispatch(myBooksError(error.response.data));
        // })
    }
};