import {MY_BOOKS_ERROR, MY_BOOKS_SUCCESS, MY_BOOKS_LOADING, SET_PAGE_NUMBER, SET_STATUS} from "../actions/my_books_action";

const defaultData = {
    isLoading: false,
    books:[],
    error:{},
    selectedStatus:0,
    page:1,
    pages:{}
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case MY_BOOKS_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case MY_BOOKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: {},
                books: action.books,
                pages: action.pages,
            }
        case SET_STATUS:
            return {
                ...state,
                selectedStatus: action.status || 0
            }
        case SET_PAGE_NUMBER:
            return {
                ...state,
                page: action.page || 1
            }
        case MY_BOOKS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state
    }
}