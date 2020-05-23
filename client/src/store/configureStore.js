import { createStore, combineReducers } from 'redux';
import categoryReducer from '../reducers/admin/category'

export default () => {
    const store = createStore(
        combineReducers({
            categories: categoryReducer
        })
    );

    return store;
}