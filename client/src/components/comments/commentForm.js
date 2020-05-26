import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import '../../styles/reviews.scss';

export default (props) => {
    const [comment,setComment] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;
    const bookId = props.computedMatch.params.bookId;

    const handleChange = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!comment) {
            setError(() => ('Can not save empty review!' ));
        } else {
            setError(() => (''));
            const commentObj = {
                content: comment,
                user: userId,
                book: bookId
            }
    
            axios.post(`http://localhost:5000/comments/`, {comment: commentObj, withCredentials: true}).then(response => {
            if (response) {
                setStatus('Review was saved');
                setComment('');
            }
            }).catch(error => {
                setStatus('Faild, error while saving review');
            });
        }
    }

    return ( 
        <div className="main">
            {error && <p>{error}</p>}
            {status && <p>{status}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="container">
                    <h1> Add comment </h1>
                    <input 
                        type="text"
                        placeholder="write your review"
                        autoFocus
                        value= {comment}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="register-btn"> ADD </button>
                </div>
            </form>
        </div>
    )
}