import React from 'react';
import ReactStars from 'react-rating-stars-component';
import '../../styles/book_details.scss';

const BookDetails = () => {
    return (
        <div className="right-card">
            <h2 className="section-title">Book Name</h2>
            <p className="author-section">by Author</p>
            <p>Category name</p>
            <div className="book-rating">
                <ReactStars
                count={5}
                size={25}
                value={3}
                edit={false}
                color2={'#F99A3D'} />
                <h4><span className="ratings-number">356</span> ratings</h4>
            </div>
            <p>Book description</p>
        </div>
    );
};

export default BookDetails;