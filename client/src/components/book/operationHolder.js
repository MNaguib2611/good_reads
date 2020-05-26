import React from 'react';
import ReactStars from 'react-rating-stars-component';
import '../../styles/operation_holder.scss';

const OperationHolder = () => {
    return (
        <div className="left-card">
            <img className="book-img" src="../../img/book.png"/>
            <select className="shelve-options" name="category" id="category" value="" onChange={event => {}} >
                <option disabled selected value="volvo">Add to shelve</option>
                <option value="">Test</option>
            </select>
            <ReactStars
            count={5}
            onChange={() => {}}
            size={40}
            value={4}
            color2={'#F99A3D'} />
        </div>
    );
};

export default OperationHolder;