import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Table from "../table";

const ListAuthors = () => {

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

    return (
        <Layout>
        <div className="card_one">
            <h5>All authors</h5>
            <Link to="/create-author" className="addIcon"><FontAwesomeIcon icon={faPlusCircle}/></Link>
        </div>
        <div className="card_two">
            {(authors.length==0) ? <h1 style={{color: "black", textAlign: "center", marginRight: "250px"}}>There is no data available right now</h1> : <Table cols={cols} data={authors} delUrl="/delete-author"/>}
        </div>
    </Layout>
    );
};

export default ListAuthors