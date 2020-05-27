import React, { useState, useEffect } from 'react';
import '../../styles/book.scss';
import Header from "../Header";
import OperationHolder from './operationHolder';
import BookDetails from './bookDetails';
import Review from './review';
import { book as getBook } from '../../API/book';

const Book = ({ match }) => {
    const bookID = match.params.id;
    
    const [ book, setBook ] = useState({
        name: '',
        author: {},
        category: {},
        description: '',
        avgRate: 0,
        rate: 0
    });

    useEffect(() => {
        const { bookId } = match && match.params;
        getBook(bookId).then(book => {
            console.log(book);
            setBook(book);
        }).catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            <div className="book-container">
                <div className="upper-card">
                    <OperationHolder book={book}/>
                    <BookDetails book={book}/>
                </div>
                <div className="bottom-card">
                    <Review bookId={bookID} />
                </div>
            </div>
        </>
    );
};

export default Book;