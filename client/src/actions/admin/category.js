// ADD_CATEGORY

export const addCategory = ( { name = '', _id= '', createdAt=''} = {}) => ({
    type: 'ADD_CATEGORY',
    category: {
        name,
        id: _id,
        createdAt
    }
});

// EDIT_CATEGORY
export const editCategory = () => ({
    type: 'EDIT_CATEGORY'
});

// SET_ERROR
export const setError = () => ({
    type: 'SET_ERROR',
    error: ""
});
