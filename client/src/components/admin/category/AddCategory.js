import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './categoryForm';
import {addNewCategory} from '../../../API/category'

const AddCategoryPage = (props) => (  
    <div>
        <CategoryForm 
            onSubmit = { category => {
                // props.dispatch(addCategory(category));
                console.log(category)
                console.log(props.location.customNameData);
                addNewCategory(props, category)
            }} 
        />
    </div>
);

const mapStateToProps = (state) => {
    return {
        categoryReducer: state.categoryReducer    
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addNewCategory: addNewCategory(dispatch),
//         dispatch
//     }
// }


export default connect(mapStateToProps)(AddCategoryPage);