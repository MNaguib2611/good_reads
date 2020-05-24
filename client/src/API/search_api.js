import axios from 'axios'
import {clearStore, searchSuccess} from "../actions/search_action";

export const search = (dispatch) => {
    return (query) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/search?q=${query}`,
            {withCredentials: true}).then(response => {
                console.log(response.data)
            if (response.data) {
                // dispatch(clearStore())
                dispatch(searchSuccess(response.data))
            }
        }).catch(error => {
            console.log(error);
            // dispatch(myBooksError(error.response.data));
        });

    }
}