import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListUl, faImage } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import {Link} from "react-router-dom";
import Layout from '../layout';
import '../../../styles/form.scss';

const AddBook = () => {
    return <Layout>
        <div className="card_one">
            <h5>Add book</h5>
            <Link to="/admin/books" className="addIcon"><FontAwesomeIcon icon={faListUl}/></Link>
        </div>
        <div className="card_two">
            <form>
                <div className="form_container">
                    <input type="text" placeholder="Enter book name" required/>
                    <select name="cars" id="cars">
                        <option disabled selected value="volvo">Select category</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                    <select name="cars" id="cars">
                        <option disabled selected value="volvo">Select author</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                    <input type="file" id="file" className="input-file"/>
                    <label htmlFor="file"><FontAwesomeIcon icon={faImage}/>  Select book photo</label>

                    <textarea placeholder="Write book's description" required/>
                    <button type="submit" className="submit-btn">Add</button>
                </div>
            </form>
        </div>
    </Layout>;
};

export default AddBook;