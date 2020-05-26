import React from "react";
import {Link} from "react-router-dom";

const CategorySearchCard = (props) => {
    return (<div className="category-search-card">
        <div className="category-search-cover-container">
            <img src="../../img/category.svg" alt="category" className="avatar"/>
        </div>
        <div className="category-search-info">
            <Link to={'/categories/'+props.category._id}><h4>{props.category.name}</h4></Link>
            <p>{props.category.type}</p>
        </div>
    </div>)
}

export default CategorySearchCard