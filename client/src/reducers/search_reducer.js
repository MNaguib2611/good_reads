import {SEARCH_SUCCESS, CLEAR_STORE} from "../actions/search_action";


const defaultData = {
    isLoading: false,
    result: [],
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
        default:
            return state
    }
}