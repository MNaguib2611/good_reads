import { combineReducers } from 'redux';
import myBooksReducer from './my_books_reducer';
import loggedReducer from './my_books_reducer';


export default combineReducers({
    myBooksReducer,loggedReducer
});