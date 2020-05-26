import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Layout from '../layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Table from "../table";
import { remove, all } from '../../../API/book';

const Books = ({ bookReducer, dispatch }) => {
    const cols = ['name', 'avgRate', 'category', 'author'];

    const deleteBook = (record) => {
        const deleteBookUrl = `http://127.0.0.1:5000/books/${record._id}`;

        remove(deleteBookUrl, dispatch).then(response => {
            bookReducer.filter((book) => {
                return book._id != record._id;
            });
        }).catch(error => {
            console.log(error);
        });
    };

    return (<Layout>
        <div className="card_one">
            <h5>All books</h5>
            <Link to="/admin/books/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
        </div>
        <div className="card_two">
            <Table cols={cols} data={bookReducer} editUrl="/admin/books/edit" del={deleteBook}/>
        </div>
    </Layout>);
};

const mapStateToProps = (state, props) => {
    return {      
        bookReducer: state.bookReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBooks: all(dispatch),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);