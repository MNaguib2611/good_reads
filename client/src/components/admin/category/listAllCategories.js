import React from 'react';
import { connect } from 'react-redux';
import Table from '../table';
import Layout from '../layout';
import { getAllCategories } from '../../../API/category';
import {editCategory} from '../../../actions/admin/category';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const ListAllCategories = ({categoryReducer}) => (  
    <div>
        <Layout>
        <div className="card_one">
            <h5>All Categories</h5>
            <Link to="/admin/categories/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
        </div>
            <div className="card_two">
                <Table 
                    cols={["id", "name"]} 
                    data={categoryReducer} 
                    editUrl="/admin/categories/edit" 
                    delUrl="/admin/categories/delete"
                />
            </div>
        </Layout>
    </div>
);

const mapStateToProps = (state, props) => {
    return {      
        categoryReducer: state.categoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(editCategory())
    return {
        getAllCategories: getAllCategories(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAllCategories);