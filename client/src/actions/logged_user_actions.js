export const ADD_LOGGED_USER = 'ADD_LOGGED_USER';
export const DELETE_LOGGED_USER = 'DELETE_LOGGED_USER';




export const addLggedUser = (user) => {
    return {
        type: ADD_LOGGED_USER,
        user
    }
};

export const deleteLggedUser = (user) => {
    return {
        type: DELETE_LOGGED_USER,
        user
    }
};