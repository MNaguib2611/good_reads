import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Table from "../table";

const Books = () => {
    const cols = ['name', 'avgRate', 'category', 'author'];
    const [ books, setBooks ] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:9000/books/').then(books => {
            setBooks(books.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (<Layout>
        <div className="card_one">
            <h5>All books</h5>
            <Link to="/admin/books/add" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
        </div>
        <div className="card_two">
            <Table cols={cols} data={books}/>
        </div>
    </Layout>);
};

export default Books;