import axios from 'axios'
import {getAllCategoriesSuccess} from "../actions/category_action";

export function getAllCategories(dispatch) {
    return () => {
        // dispatch(myBooksLoading());
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`,
            {withCredentials: true}).then(response => {
            if (response.data) {
                dispatch(getAllCategoriesSuccess(response.data))
            }
        }).catch(error => {
            console.log(error);
            // dispatch(myBooksError(error.response.data));
        });

    }
}
