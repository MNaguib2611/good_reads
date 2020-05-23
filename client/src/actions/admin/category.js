// ADD_CATEGORY

export const addCategory = ( { name = ''} = {}) => ({
    type: 'ADD_CATEGORY',
    category: {
        name
    }
});