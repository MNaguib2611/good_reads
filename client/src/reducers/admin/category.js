// category reducer

const categoryReducerDefaultState = [];

export default (state = categoryReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_CATEGORY':
            return [
                ...state,
                action.category
            ];
        default:
            return state;
    }
}