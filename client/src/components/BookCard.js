import React from "react";
import ChangeStateBtn from "./ChangeStateBtn";
// import RatingBar from "./RatingBar";
import ReactStars from 'react-rating-stars-component'
const BookCard = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating)
    }
    return (<div className="book-card">
        <div className="cover-container">
            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1494421362l/29324861.jpg"/>
        </div>
        <div className="book-info">
            <h3>Learning React: Functional Web Development with React and Redux</h3>
            <h5>By: Alex Banks</h5>
            <div className="module line-clamp">
                <p className="book-card-desc ">If you want to learn how to build efficient user interfaces with React,
                    this is your book. Authors Alex Banks and Eve Porcello show you how to create UIs with this small
                    JavaScript library that can deftly display data changes on large-scale, data-driven websites without
                    page reloads. Along the way, you'll learn how to work with functional programming and the latest
                    ECMAScript features.

                    Developed by Facebook, and used by companies including Netflix, Walmart, and The New York Times for
                    large parts of their web interfaces, React is quickly growing in use. By learning how to build React
                    components with this hands-on guide, you'll fully understand how useful React can be in your
                    organization.


                    Learn key functional programming concepts with JavaScript
                    Peek under the hood to understand how React runs in the browser
                    Create application presentation layers by mounting and composing React components
                    Use component trees to manage data and reduce the time you spend debugging applications
                    Explore React's component lifecycle and use it to load data and improve UI performance
                    Use a routing solution for browser history, bookmarks, and other features of single-page
                    applications
                    Learn how to structure React applications with servers in mind</p>
            </div>
            <ChangeStateBtn/>
            <div className="rating-container">
                <p >Avg Rate: </p>
                <ReactStars
                    count={5}
                    size={24}
                    value={2}
                    edit={false}
                    color2={'#F99A3D'} />
                <p >Rate it: </p>
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