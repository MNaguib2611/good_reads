import {
    MY_BOOKS_ERROR,
    MY_BOOKS_SUCCESS,
    MY_BOOKS_LOADING,
    SET_PAGE_NUMBER,
    SET_STATUS,
    UPDATA_BOOK_DATA,
    UPDATA_RATE
} from "../actions/my_books_action";

const defaultData = {
    isLoading: false,
    books: [],
    error: {},
    selectedStatus: 0,
    page: 1,
    pages: {}
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
        case UPDATA_BOOK_DATA:
            const books = updateMyBooks(state.books, action.book)
            return {
                ...state,
                books
            }
        case UPDATA_RATE:
            const newBooks = updateRate(state.books, action.userRate,action.avgRate,action.bookID)
            return {
                ...state,
                books:newBooks
            }

        default:
            return state
    }
}

const updateMyBooks = (books,newBook) =>{
    return books.map((book) => {
        if (newBook.book._id === book.book._id) {
            book = newBook
        }
        return book
    })
}

const updateRate = (books,userRate,avgRate,bookID) =>{
    return books.map((book) => {
        if (bookID === book.book._id) {
            book.book.avgRate = avgRate
            book.book.userRate = userRate
        }
        return book
    })
}