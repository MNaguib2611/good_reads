import React from "react";
import {Link} from "react-router-dom";

const CategoryCard = ({category}) => {
    return(<div className="category-card">
        <h4>{category.name}</h4>
        <hr className="solid"/>
        <img src="../../../img/category.svg"/>
        <hr className="solid"/>
        <Link to={'/categories/'+category._id}>See Books</Link>
    </div>)
}

export default CategoryCard