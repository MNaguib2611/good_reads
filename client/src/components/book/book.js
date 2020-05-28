import React, { useState, useEffect } from 'react';
import '../../styles/book.scss';
import Header from "../Header";
import OperationHolder from './operationHolder';
import BookDetails from './bookDetails';
import Alert from '../../components/alerts/alert';
import Review from './review';
import { book as getBook } from '../../API/book';
import { handleError } from '../../errors/book';

const Book = ({ match }) => {
    const [ book, setBook ] = useState({
        _id: null,
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

    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        const { id } = match && match.params;
        getBook(id).then(res => {
            if (res.data){
                const book = res.data;
                setBook({
                    ...book.book,
                    status: book.status,
                    userRate: book.userRate
                });
            }else {
                handleError(setAlert, 'Connection lost', 10000);
            }
        }).catch(error => {
            handleError(setAlert, 'Server error');
        });
    }, []);

    return (
        <>
            <Header />
            <div className="book-container">
                {
                    alert.errors || alert.success
                    && 
                    <Alert message={alert.message} type={alert.errors && "error" || alert.success && "success"}/>
                }
                <div className="upper-card">
                    <OperationHolder book={book} setBook={setBook} setAlert={setAlert} alert={alert}/>
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