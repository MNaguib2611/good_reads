import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../home/Home.css';
import Header from '../../Header';
import Pagination from '../../home/Pagination';

export default (props) => {
    const [books,setBooks]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(8);
    // const [authors, setAuthors] = useState([]);

    useEffect( () => {
        console.log(props.computedMatch.params.id);
        
        axios.get(`http://localhost:5000/categories/${props.computedMatch.params.id}`, {withCredentials: true}).then(response => {
            console.log(response.data);
            setBooks(response.data);
            // data.map(book =>{
            //     console.log(book.author);
                
                // axios.get(`http://localhost:5000/authors/${book.author}`, {withCredentials: true}).then(response => {
                //     console.log(response.data.data);
                //     let obj = {
                //         name: response.data.data.name,
                //         authorId: response.data.data._id
                //     }
                //     setAuthors(authors => authors.concat(obj));
            //     }).catch(error => {
            //         console.log(error);
            //     });
            // })
          }).catch(error => {
            console.log(error);
          });
    }, []);

    const indexOfLastPost = currentPage * booksPerPage;
    const indexOfFirstPost = indexOfLastPost - booksPerPage;
    const currentBooks = books.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <Header />     
            <div className="right-div category-books">
                {
                    currentBooks.map(book => {
                        return ( 
                            <div className="card CardDiv">
                                <img  src={`${process.env.REACT_APP_BACKEND_URL}${book.image}`} alt="book image"  className="card-img-top"  width="100%" height="140" />
                                <Link to="#"><h4 className="card-title">{book.name}</h4></Link>
                                <hr/>
                                <Link to="#"><small>By: {book.author.name}</small></Link>
                            </div> 
                        )
                    })
                }
              
            </div>
            <Pagination
                booksPerPage={booksPerPage}
                totalBooks={books.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </>
    )
}
