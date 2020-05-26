
export const ALL_CATEGORIES_LOADING = 'ALL_CATEGORIES_LOADING';
export const ALL_CATEGORIES_SUCCESS = 'ALL_CATEGORIES_SUCCESS';
export const ALL_CATEGORIES_ERROR = 'ALL_CATEGORIES_ERROR';



export const getAllCategoriesLoading = () => {
    return {
        type: ALL_CATEGORIES_LOADING
    }
};


export const getAllCategoriesSuccess = (categories) => {
    return {
        type: ALL_CATEGORIES_SUCCESS,
        categories,
    }
};

export const getAllCategoriesError = (error) => {
    return {
        type: ALL_CATEGORIES_ERROR,
        error
    }
};