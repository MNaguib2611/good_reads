import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Layout from '../layout';

const AddBook = () => {
    return <Layout>
        <div className="card_one">
            <h5>Add books</h5>
            <Link to="/admin/books" className="addIcon"><FontAwesomeIcon icon={faListUl}/></Link>
        </div>
        <div className="card_two">
            
        </div>
    </Layout>;
};

export default AddBook;