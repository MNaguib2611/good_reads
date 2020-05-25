export const SEARCH_LOADING = 'SEARCH_LOADING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const CLEAR_STORE = 'CLEAR_STORE';


export const searchSuccess = (result) => {
    return {
        type:SEARCH_SUCCESS,
        result
    }
}

export const clearStore = () => {
    return {
        type:CLEAR_STORE
    }
}