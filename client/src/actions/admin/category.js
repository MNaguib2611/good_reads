// ADD_CATEGORY

export const addCategory = ( { name = '', _id= ''} = {}) => ({
    type: 'ADD_CATEGORY',
    category: {
        name,
        id: _id
    }
});

// EDIT_CATEGORY
export const editCategory = () => ({
    type: 'EDIT_CATEGORY'
});