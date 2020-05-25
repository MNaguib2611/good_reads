import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Table from "../table";

const Authors = () => {

    const cols = ['name', 'bio', 'image'];
    const [ authors, setAuthors ] = useState([]);

    const getURL = `${process.env.REACT_APP_BACKEND_URL}/authors/`;

    useEffect(() => {
        axios.get(getURL,{
            withCredentials: true
        }).then(authors => {
            setAuthors(authors.data.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (<Layout>
        <div className="card_one">
            <h5>All authors</h5>
            <Link to="/create-author" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
        </div>
        <div className="card_two">
            <Table cols={cols} data={authors}/>
        </div>
    </Layout>);
};

export default Authors