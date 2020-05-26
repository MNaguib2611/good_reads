import {ALL_CATEGORIES_ERROR, ALL_CATEGORIES_SUCCESS, ALL_CATEGORIES_LOADING} from "../actions/category_action";

const defaultData = {
    isLoading: false,
    categories: [],
    error: {},
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errors: {},
                categories: action.categories,
            }
        default:
            return state
    }
}