import React from 'react';
import { connect } from 'react-redux';
import Table from '../table';
import Layout from '../layout';
import { getAllCategories } from '../../../API/category';
import {editCategory} from '../../../actions/admin/category';


const ListAllCategories = ({categoryReducer}) => (  
    <div>
        <Layout />
        <Table cols={["id", "name"]} data={categoryReducer} />
    </div>
);

const mapStateToProps = (state, props) => {
    return {      
        categoryReducer: state.categoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: getAllCategories(dispatch),
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAllCategories);