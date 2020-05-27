
// category reducer

const categoryReducerDefaultState = []

export default (state = categoryReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_CATEGORY':
            return [
                ...state,
                action.category
            ];
        case 'EDIT_CATEGORY':
            state = []
            return state;
        case 'SET_ERROR':
            return [
                ...state,
                action.error
            ];
        default:
            return state;
    }
}