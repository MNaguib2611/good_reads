export const SEARCH_LOADING = 'SEARCH_LOADING';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const CLEAR_STORE = 'CLEAR_STORE';
export const SAVE_OLD_RESULTS = 'SAVE_OLD_RESULTS';
export const CLEAR_OLD_RESULTS = 'CLEAR_OLD_RESULTS';


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

export const saveOldResults = () => {
    return {
        type: SAVE_OLD_RESULTS
    }
}

export const clearOldResults = () => {
    return {
        type: CLEAR_OLD_RESULTS
    }
}