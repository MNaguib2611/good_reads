import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../components/home/Home.css';
import Header from '../../components/Header';
import Pagination from '../../components/home/Pagination';

const GetAllAuthors = (props) => {
    // console.log(props)
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage] = useState(8);

    const getURL = `${process.env.REACT_APP_BACKEND_URL}/authors/`;

    useEffect( () => {

        axios.get(getURL, {withCredentials: true}).then(authors => {
            // console.log(authors.data.data);
            setAuthors(authors.data.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const indexOfLastPost = currentPage * authorsPerPage;
    const indexOfFirstPost = indexOfLastPost - authorsPerPage;
    const currentauthors = authors.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <Header />
            <div className="right-div category-books">
                {
                    currentauthors.map(author => {
                        return (
                            <div className="card CardDiv">
                                <img  src={`${process.env.REACT_APP_BACKEND_URL}${author.image}`}   className="card-img-top"  width="100%" height="80%" />
                                <hr/>
                                <Link to={`authors/${author._id}`}><h4 className="card-title">{author.name}</h4></Link>
                            </div>
                        )
                    })
                }

            </div>
            <Pagination
                booksPerPage={authorsPerPage}
                totalBooks={authors.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </>
    )
}

export default GetAllAuthors