import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Layout from '../layout';
import BookForm from './bookForm';
import { add } from '../../../API/book';
import { getAllCategories } from '../../../API/category';
import { all } from '../../../API/author';
import { handleError, handleSuccess } from '../../../errors/book';

const AddBook = ({ dispatch, categoryReducer, history }) => {
    const [ book, setBook ] = useState({
        name: '',
        category: null,
        author: null,
        description: ''
    });

    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    const [ authors, setAuthors ] = useState([]);

    useEffect(() => {
        all().then(authors => {
            setAuthors(authors);
        });
    }, []);

    const fileInput = React.createRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!book.name || !book.category || !book.author){
            handleError(setAlert, 'Please check required fields');
            return;
        }

        add(book, fileInput, dispatch).then(res => {
            if(!res.data){
                handleError(setAlert, res.response.data.error);
                return;
            }
            
            handleSuccess(setAlert, 'New book added successfully', 1000, () => {
                history.push('/admin/books');
            })
        }).catch(err => {
            console.log(err);
            handleError(setAlert, '500 Error');
            return;
        });
    };

    return <Layout>
        <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <h5>{alert.message}</h5>
                :
                <h5>Add book</h5>
            }
            <Link to="/admin/books" className="addIcon"><FontAwesomeIcon icon={faListUl}/></Link>
        </div>
        <div className="card_two">
            <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} fileInput={fileInput} errors={alert.errors} categories={categoryReducer} authors={authors} operation="Add"/>
        </div>
    </Layout>;
};

const mapStateToProps = state => {
    return {
        bookReducer: state.bookReducer,
        categoryReducer: state.categoryReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: getAllCategories(dispatch),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);