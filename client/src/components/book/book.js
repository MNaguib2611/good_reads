import React, { useState, useEffect } from 'react';
import '../../styles/book.scss';
import Header from "../Header";
import OperationHolder from './operationHolder';
import BookDetails from './bookDetails';
import Review from './review';

const Book = (props) => {
    const bookId  = props.computedMatch.params.id;
    
    return (
        <>
            <Header />
            <div className="book-container">
                <div className="upper-card">
                    <OperationHolder />
                    <BookDetails />
                </div>
                <div className="bottom-card">
                    <Review bookId={bookId} />
                </div>
            </div>
        </>
    );
};

export default Book;