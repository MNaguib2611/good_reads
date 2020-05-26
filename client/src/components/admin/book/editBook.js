import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Layout from '../layout';
import BookForm from './bookForm';
import { edit } from '../../../API/book';
import { getAllCategories } from '../../../API/category';
import { all } from '../../../API/author';

const EditBook = ({ location: { state: { record } = {} } = {}, history, categoryReducer } = {}) => {
    const [ book, setBook ] = useState({
        id: record && record._id,
        name: record && record.name,
        category: record && record.category && record.category._id,
        author: record && record.author && record.author._id,
        description: record && record.description
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
            setAlert({
                errors: true,
                message: 'Check required fields'
            });
            setTimeout(() => {
                setAlert({
                    errors: false,
                    message: ''
                });
            }, 5000);
            return;
        }
        
        edit(record._id, book, fileInput).then(response => {
            setAlert({
                success: true,
                message: 'Book data updated successfully',
            });
            setTimeout(() => {
                setBook({
                    name: '',
                    category: null,
                    author: null,
                    description: ''
                });

                history.push('/admin/books');
            }, 1000);
        }).catch(error => {
            console.log(error);
        });;
    };

    return <Layout>
        <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
            {alert.errors || alert.success ?
                <h5>{alert.message}</h5>
                :
                <h5>Edit book</h5>
            }
            <Link to="/admin/books" className="addIcon"><FontAwesomeIcon icon={faListUl}/></Link>
        </div>
        <div className="card_two">
        <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} fileInput={fileInput} errors={alert.errors} categories={categoryReducer} authors={authors} operation="Edit"/>
        </div>
    </Layout>;
};

const mapStateToProps = state => {
    return {
        categoryReducer: state.categoryReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: getAllCategories(dispatch),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);