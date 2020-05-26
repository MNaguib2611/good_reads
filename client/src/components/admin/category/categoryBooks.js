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
                    console.log(response.data.data);
                    let obj = {
                        name: response.data.data.name,
                        authorId: response.data.data._id
                    }
                    let check = 0
                    for (let i = 0; i < authors.length; i++) {
                        console.log(check);
                        if (authors[i].authorId === response.data.data._id) {
                            console.log(check);
                            check = 1                         
                        }
                    }
                    if (check == 0) {   
                        setAuthors(authors => authors.concat(obj));
                    }
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
                                <small>
                                {
                                    authors.map(author => 
                                        author.authorId === book.author? `Author : ${author.name}` : "-"
                                    )
                                }
                                </small>
                                <br/>
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
