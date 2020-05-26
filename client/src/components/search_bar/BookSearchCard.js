import React from "react";
import {Link} from "react-router-dom";

const BookSearchCard = (props) => {
    return (<div className="book-search-card">
        <div className="book-search-cover-container">
            <img src={props.book.image ?`${process.env.REACT_APP_BACKEND_URL}${props.book.image}` : "https://www.esm.rochester.edu/uploads/NoPhotoAvailable-335x419.jpg"} alt={props.book.name}/>
        </div>
        <div className="book-search-info">
            <Link to=""><h4>{props.book.name}</h4></Link>
            {/*<h5>By: Nagib</h5>*/}
            <p>Book</p>
        </div>
    </div>)
}

export default BookSearchCard