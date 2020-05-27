import React, { useState, useEffect } from 'react';
import '../../styles/book.scss';
import Header from "../Header";
import OperationHolder from './operationHolder';
import BookDetails from './bookDetails';
import Review from './review';
import { book as getBook } from '../../API/book';

const Book = ({ match }) => {
    const [ book, setBook ] = useState({
        name: '',
        author: {},
        category: {},
        description: '',
        avgRate: 0,
        rate: 0,
        image: null,
        status: 'not selected',
        userRate: 0
    });

    useEffect(() => {
        const { id } = match && match.params;
        getBook(id).then(book => {
            console.log(book);
            setBook({
                ...book.book,
                status: book.status,
                userRate: book.userRate
            });
        }).catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            <div className="book-container">
                <div className="upper-card">
                    <OperationHolder book={book} setBook={setBook}/>
                    <BookDetails book={book}/>
                </div>
                <div className="bottom-card">
                    <Review bookId={book._id} />
                </div>
            </div>
        </>
    );
};

export default Book;