import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './categoryForm';
// import addCategory from '../../actions/admin/category';

const AddCategoryPage = (props) => (  
    <div>
        <h3> Add Category </h3>
        <CategoryForm 
            onSubmit = { category => console.log(category)} 
        />
    </div>
);

export default connect()(AddCategoryPage);