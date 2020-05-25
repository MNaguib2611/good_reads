import React from 'react';
import { connect } from 'react-redux';
import Layout from '../layout';
import CategoryForm from './categoryForm';
import {addNewCategory} from '../../../API/category';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddCategoryPage = (props) => (  
    <Layout>
        <div className="card_one">
            <h5>Add Category</h5>
            <Link to="/admin/categories/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
        </div>
        <div className="card_two">
            <CategoryForm 
                onSubmit = { category => {
                    // props.dispatch(addCategory(category));
                    console.log(category)
                    console.log(props.location.customNameData);
                    addNewCategory(props, category)
                }} 
            />
        </div>
    </Layout>
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