import React from 'react';
import ReactStars from 'react-rating-stars-component';
import '../../styles/operation_holder.scss';

const OperationHolder = ({ book }) => {
    return (
        <div className="left-card">
            <img className="book-img" src={book.image ? `http://localhost:5000${book.image}` : "../../img/book.png"}/>
            <select className="shelve-options" name="category" id="category" value={book.status && book.status != 'not selected' ? book.status : null } onChange={event => {}} >
                <option disabled selected value="">Add to shelve</option>
                <option value="read">Read</option>
                <option value="reading">Reading</option>
                <option value="want to read">Want to read</option>
            </select>
            <ReactStars
            count={5}
            onChange={() => {}}
            size={40}
            value={book.userRate && book.userRate}
            color2={'#F99A3D'} />
        </div>
    );
};

export default OperationHolder;