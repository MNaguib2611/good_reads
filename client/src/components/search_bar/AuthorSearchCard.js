import React from "react";
const AuthorSearchCard = (props) => {
    return (<div className="author-search-card">
        <div className="author-search-cover-container">
            <img src="../../img/user_avatar.jpg" alt="author" className="avatar"/>
        </div>
        <div className="author-search-info">
            <h4>{props.author.name}</h4>
            <p>{props.author.type}</p>
        </div>
    </div>)
}

export default AuthorSearchCard