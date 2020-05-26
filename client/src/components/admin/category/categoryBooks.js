import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default () => {
    const [books,setBooks]=useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect( () => {
        axios.get("http://localhost:5000/categories/5ecb8027a4eedd1bfb6d9547?limit=2&skip=0", {withCredentials: true}).then(response => {
            console.log(response.data);
            const data = response.data;
            setBooks(response.data);
            data.map(book =>{
                console.log(book.author);
                
                axios.get(`http://localhost:5000/authors/${book.author}`, {withCredentials: true}).then(response => {
                    console.log(response);   
                }).catch(error => {
                    console.log(error);
                });
            })
          }).catch(error => {
            console.log(error);
          });
    }, []);

    return (
        <div>
            <ul>
                {
                    books.map(book => {
                        return (
                            <Link  key={book.name} to="">
                                <div>
                                <img  src={`${process.env.REACT_APP_BACKEND_URL}${book.image}`} alt="book image" />
                                <h4>{book.name}</h4>
                                <small>Author : {book.author} </small> <br/>
                                <hr/>
                                </div>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}
