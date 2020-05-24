import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './categoryForm';
import {addCategory} from '../../../actions/admin/category';
import {addNewCategory} from '../../../API/category'

const AddCategoryPage = (props) => (  
    <div>
        <CategoryForm 
            onSubmit = { category => {
                // props.dispatch(addCategory(category));
                console.log(category)
                addNewCategory(props, category)
            }} 
        />
    </div>
);

// const mapStateToProps = (state) => {
//     return {
//         category: state.category
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addNewCategory: addNewCategory(dispatch),
//         dispatch
//     }
// }


export default connect()(AddCategoryPage);