import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './categoryForm';
import {editCategoryFun} from '../../../API/category';
import Layout from '../layout';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const EditCategoryPage = (props) => (  
    <Layout>
        <div className="card_one">
            <h5>Edit Category</h5>
            <Link to="/admin/categories/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
        </div>
        <div className="card_two">
            <CategoryForm 
                // category={props.category}
                category={props.location.state.record}
                onSubmit = { category => {
                    editCategoryFun(props,category);
                }} 
            />
        </div>
    </Layout>
);

const mapStateToProps = (state, props) => {
    return {
        category: state.categoryReducer.find((category) => category.id === props.match.params.id)   
    }
}

export default connect(mapStateToProps)(EditCategoryPage);