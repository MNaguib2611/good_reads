import {AUTHOR_DATA_ERROR, AUTHOR_DATA_SUCCESS,AUTHOR_DATA_LOADING, AUTHOR_BOOKS_SUCCESS} from "../actions/author_action";

const defaultData = {
    author: {},
    error: {},
    isLoading: false,
    books:[]
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case AUTHOR_DATA_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case AUTHOR_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: {},
                author: action.author,
            }
        case AUTHOR_BOOKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: {},
                books: action.books,
            }
        case AUTHOR_DATA_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}