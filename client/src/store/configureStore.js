import { createStore, combineReducers,applyMiddleware ,compose} from 'redux';
import thunk from "redux-thunk";
import myBooksReducer from "../reducers/my_books_reducer";
import categoryReducer from '../reducers/admin/category'
import searchReducer from '../reducers/search_reducer'
export default () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            myBooksReducer, 
            categoryReducer,
            searchReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );


    return store;
};
