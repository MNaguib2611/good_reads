import {SEARCH_SUCCESS, CLEAR_STORE, SAVE_OLD_RESULTS, CLEAR_OLD_RESULTS} from "../actions/search_action";


const defaultData = {
    isLoading: false,
    result: [],
    oldResults:[],
    error: {},
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                result: action.result
            }
        case CLEAR_STORE:
            return {
                ...state,
                isLoading: false,
                result: []
            }
        case CLEAR_OLD_RESULTS:
            return {
                ...state,
                isLoading: false,
                oldResults: []
            }
        case SAVE_OLD_RESULTS:
            const oldResults = state.result
            return {
                ...state,
                isLoading: false,
                oldResults,
                result: []
            }
        default:
            return state
    }
}