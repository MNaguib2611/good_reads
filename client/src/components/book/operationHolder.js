import React from 'react';
import ReactStars from 'react-rating-stars-component';
import '../../styles/operation_holder.scss';
import { updateBookStatus, rateBook } from '../../API/book';
import {getUserData} from "../../utils/utils";

const OperationHolder = ({ book, setBook }) => {
    const addToShelve = (event) => {
        const status = event.target.value;
        updateBookStatus(getUserData()._id, book._id, status).then(res => {
            setBook({
                ...book,
                status
            });
        })
    }

    const rate = (newRate) => {
        console.log(book._id);
        rateBook(book._id, newRate).then(res => {
            setBook({
                ...book,
                userRate: newRate
            });
        }).catch(err => console.log(err))
    }
    return (
        <div className="left-card">
            <img className="book-img" src={book.image ? `http://localhost:5000${book.image}` : "../../img/book.png"}/>
            <select className="shelve-options" name="category" id="category" value={book.status} onChange={addToShelve} >
                <option disabled selected value="not selected">Add to shelve</option>
                <option value="read">Read</option>
                <option value="reading">Reading</option>
                <option value="want to read">Want to read</option>
            </select>
            <ReactStars
            count={5}
            onChange={rate}
            size={40}
            value={book.userRate ? book.userRate : 0}
            color2={'#F99A3D'} />
        </div>
    );
};

export default OperationHolder;