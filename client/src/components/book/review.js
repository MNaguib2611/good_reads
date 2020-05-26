import React from 'react';
import '../../styles/review.scss';
import CommentForm from '../comments/commentForm';
import CommentsList from '../comments/listBookComments'

const Review = (props) => {
    return (
        <fieldset key="books" className="reviews">
            <legend> <strong>Reviews</strong></legend>
            <CommentForm bookId={props.bookId}/>
            {/*<CommentsList bookId={props.bookId}/>*/}
            <ul>
                <li key="" className="comments">
                </li>
            </ul>
        </fieldset>
    );
}

export default Review;