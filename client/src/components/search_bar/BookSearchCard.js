import React from "react";

const BookSearchCard = (props) => {
    return (<div className="book-search-card">
        <div className="book-search-cover-container">
            <img
                src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg"/>
        </div>
        <div className="book-search-info">
            <h4>{props.book.name}</h4>
            {/*<h5>By: Nagib</h5>*/}
            <p>Book</p>
        </div>
    </div>)
}

export default BookSearchCard