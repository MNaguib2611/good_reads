import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './categoryForm';
import {editCategoryFun} from '../../../API/category'

const EditCategoryPage = (props) => (  
    <div>
        <CategoryForm 
            // category={props.category}
            category={props.location.state.record}
            onSubmit = { category => {
                console.log(category);
                editCategoryFun(props,category);
            }} 
        />
    </div>
);

const mapStateToProps = (state, props) => {
    console.log(props.match.params.id);
    return {
        category: state.categoryReducer.find((category) => category.id === props.match.params.id)   
    }
}

export default connect(mapStateToProps)(EditCategoryPage);