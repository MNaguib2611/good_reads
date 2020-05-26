import React, { useState, useEffect } from 'react';
import '../../styles/book.scss';
import Header from "../Header";
import OperationHolder from './operationHolder';
import BookDetails from './bookDetails';
import Review from './review';

const Book = () => {
    return (
        <>
            <Header />
            <div className="book-container">
                <div className="upper-card">
                    <OperationHolder />
                    <BookDetails />
                </div>
                <div className="bottom-card">
                    <Review />
                </div>
            </div>
        </>
    );
};

export default Book;