export const MY_BOOKS_LOADING = 'MY_BOOKS_LOADING';
export const MY_BOOKS_SUCCESS = 'MY_BOOKS_SUCCESS';
export const MY_BOOKS_ERROR = 'MY_BOOKS_ERROR';
export const SET_STATUS = 'SET_STATUS';
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const UPDATA_RATE= 'UPDATA_RATE';
export const UPDATA_BOOK_DATA = 'UPDATA_BOOK_DATA';


export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
};

export const setPageNumber = (page) => {
    return {
        type: SET_PAGE_NUMBER,
        page
    }
};

export const myBooksLoading = () => {
    return {
        type: MY_BOOKS_LOADING
    }
};


export const myBooksSuccess = (books,pages) => {
    return {
        type: MY_BOOKS_SUCCESS,
        books,
        pages
    }
};

export const myBooksError = (error) => {
    return {
        type: MY_BOOKS_ERROR,
        error
    }
};

export const updateBook = (book) => {
    return {
        type:UPDATA_BOOK_DATA,
        book
    }
}

export const updateRate = (userRate,avgRate,bookID) => {
    return {
        type: UPDATA_RATE,
        userRate,
        avgRate,
        bookID
    }
}