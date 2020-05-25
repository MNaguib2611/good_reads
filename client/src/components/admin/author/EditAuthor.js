import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListUl, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Link} from "react-router-dom";
import Layout from '../layout';
import '../../../styles/form.scss';

const EditBook = ({ location: { state: { record } } }) => {
    const [ book, setBook ] = useState({
        name: record && record.name,
        category: record && record.category.name,
        author: record && record.author.name,
        description: record && record.description
    });
    const [ errors, setErrors ] = useState(false);

    const fileInput = React.createRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const createBookUrl = 'http://127.0.0.1:9000/books';
        if(!book.name || !book.category || !book.author){
            setErrors(true);
            setTimeout(() => {
                setErrors(false);
            }, 5000);
        }

        const formData = new FormData();
        formData.set('name', book.name);
        formData.set('category', book.category);
        formData.set('author', book.author);
        formData.append('image', fileInput.current.files[0]);
        formData.set('description', book.description);

        axios.post(createBookUrl, formData, {
            withCredentials: true ,
        }).then((res) => {
            console.log(res);
        })
            .catch((err) => {
                console.log("test", err)
            });
    };

    return <Layout>
        <div className="card_one" style={{backgroundColor: errors && 'red'}}>
            {errors ?
                <h5>Check required fields</h5>
                :
                <h5>Edit book</h5>
            }
            <Link to="/admin/books" className="addIcon"><FontAwesomeIcon icon={faListUl}/></Link>
        </div>
        <div className="card_two">
            <form onSubmit={handleSubmit}>
                <div className="form_container">
                    <input type="text" placeholder="Enter book name" value={book.name} onChange={event => setBook({...book, name: event.target.value})} style={{border: errors && '1px red solid'}} />
                    <select name="category" id="category" value={book.category} onChange={event => setBook({...book, category: event.target.value})} style={{border: errors && '1px red solid'}} >
                        <option disabled selected value="volvo">Select category</option>
                        <option value="5ebc76af0d3c043fd85726b7">Test category</option>
                    </select>
                    <select name="author" id="author" value={book.author} onChange={event => setBook({...book, author: event.target.value})} style={{border: errors && '1px red solid'}} >
                        <option disabled selected value="volvo">Select author</option>
                        <option value="5ebc783e0d3c043fd85726b8">Kareem Saeed</option>
                    </select>
                    <input type="file" id="file" className="input-file" ref={fileInput}/>
                    <label htmlFor="file"><FontAwesomeIcon icon={faImage}/>  Select book photo</label>

                    <textarea placeholder="Write book's description" value={book.description} onChange={event => setBook({...book, description: event.target.value})}/>
                    <button type="submit" className="submit-btn">Add</button>
                </div>
            </form>
        </div>
    </Layout>;
};

export default EditBook;