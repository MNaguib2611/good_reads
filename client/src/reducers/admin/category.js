
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
            console.log("in reducer");
            console.log(state);
            return state;
        default:
            return state;
    }
}