import React from "react";
import ChangeStateBtn from "./ChangeStateBtn";
// import RatingBar from "./RatingBar";
import ReactStars from 'react-rating-stars-component'
const BookCard = (props) => {
    const {book} = props
    const ratingChanged = (newRating) => {
        console.log(newRating)
    }
    return (<div className="book-card">
        <div className="cover-container">
            <img src={book.book.image} />
        </div>
        <div className="book-info">
            <h3>{book.book.name}</h3>
            <h5>By: {book.book.author.name}</h5>
            <div className="module line-clamp">
                <p className="book-card-desc ">{book.book.description}</p>
            </div>
            <ChangeStateBtn currentStatus={book.status} book_id={book.book._id}/>
            <div className="rating-container">
                <p className="rate-text">Avg Rate: </p>
                <ReactStars
                    count={5}
                    size={24}
                    value={book.book.avgRate}
                    edit={false}
                    color2={'#F99A3D'} />
                <p className="rate-text">Rate it: </p>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    color2={'#F99A3D'} />
            </div>
        </div>
    </div>)
}

export default BookCard