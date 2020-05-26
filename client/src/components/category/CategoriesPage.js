import React, {useEffect} from "react";
import Header from "../Header";
import '../../styles/categories.scss'
import {connect} from 'react-redux'
import {getAllCategories} from "../../API/category_api";
import CategoryCard from "./CategoryCard";

const CategoriesPage = (props) => {
    const {categories} = props
    useEffect(() => {
        props.getAllCategories()
    }, [])

    return <div>
        <Header/>
        <div className="categories-container">
            {
                categories.map((category) => {
                    return <CategoryCard key={category._id} category={category}/>
                })
            }
        </div>
    </div>
}

const mapStateToProps = (state) => {

    return {
        categories: state.categoriesReducer.categories,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: getAllCategories(dispatch),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage)