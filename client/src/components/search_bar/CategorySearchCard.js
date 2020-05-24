import React from "react";

const CategorySearchCard = (props) => {
    return (<div className="category-search-card">
        <div className="category-search-cover-container">
            <img src="../../img/category.svg" alt="category" className="avatar"/>
        </div>
        <div className="category-search-info">
            <h4>{props.category.name}</h4>
            <p>{props.category.type}</p>
        </div>
    </div>)
}

export default CategorySearchCard