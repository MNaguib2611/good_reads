
export const AUTHOR_DATA_LOADING = 'AUTHOR_DATA_LOADING';
export const AUTHOR_DATA_SUCCESS = 'AUTHOR_DATA_SUCCESS';
export const AUTHOR_DATA_ERROR = 'AUTHOR_DATA_ERROR';
export const AUTHOR_BOOKS_SUCCESS = 'AUTHOR_BOOKS_SUCCESS';

export const getAuthorLoading = () => {
    return {
        type: AUTHOR_DATA_LOADING
    }
};


export const getAuthorSuccess = (author) => {
    return {
        type: AUTHOR_DATA_SUCCESS,
        author,
    }
};

export const getAuthorBooksSuccess = (books) => {
    return {
        type: AUTHOR_BOOKS_SUCCESS,
        books,
    }
};
export const getAuthorError = (error) => {
    return {
        type: AUTHOR_DATA_ERROR,
        error
    }
};