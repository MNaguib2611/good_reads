import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../styles/reviews.scss';


export default (props) => {
    console.log(props);
    
    const [comment,setComment] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [comments,setComments]=useState([]);
    const userId = JSON.parse(localStorage.getItem('loggedUser'))._id;
    const bookId = props.bookId;

    const listCmments = ()=>{
        axios.get(`http://localhost:5000/comments/${props.bookId}`, {withCredentials: true}).then(response => {
            setComments(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect( () => { listCmments() }, []);

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
                listCmments();
            }
            }).catch(error => {
                setStatus('Faild, error while saving review');
            });
        }
    }

    return ( 
        <div className="main">
            {error && <p className="error">{error}</p>}
            {status && <p className="status">{status}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="container">
                    <textarea 
                        type="text"
                        placeholder="write your review"
                        autoFocus
                        value= {comment}
                        onChange={handleChange}
                        
                    />
                    <button type="submit" className="addBtn"> Submit </button>
                </div>
            </form>
            <br />
            <div>
                {
                    comments.map(comment => {
                        return ( 
                            <div className="commentDiv">
                                <div className="userImage">
                                    <img src="../../../img/user_avatar.jpg" alt="By:" className="user-photo"/>
                                </div>
                                <div className="userDiv">
                                    <div className="userName">
                                        <h4> 
                                            {comment.user.username} 
                                            <small className="createdAt"> . { comment.createdAt } </small> 
                                        </h4>
                                    </div>
                                    <div className="commentBody">
                                        <p>{comment.content}</p>
                                    </div>
                                </div>               
                            </div> 
                        )
                    })
                }   
            </div>
        </div>
    )
}