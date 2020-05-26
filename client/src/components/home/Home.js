import React ,{useState ,useEffect} from 'react';
import Header from '../Header';
import './Home.css';
import BookHome from './BookHome'
import axios from 'axios';
import { Link } from "react-router-dom";
import Pagination from './Pagination'

const Home = () => {
  const [books,setBooks]=useState([]);
  const [popularBooks,setpopulaBooks]=useState([]);
  const [popularAuthors,setpopularAuthors]=useState([]);
  const [poularCategories,setpoularCategories]=useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  
  const booksURL = `${process.env.REACT_APP_BACKEND_URL}/books`
  const popularBooksURL = `${process.env.REACT_APP_BACKEND_URL}/books/popular/all`
  const popularAuthorsURL = `${process.env.REACT_APP_BACKEND_URL}/authors/popular/all`
  const popularCategoryURL = `${process.env.REACT_APP_BACKEND_URL}/categories/popular/all`

    useEffect(  () => {
      setLoading(true);
      const fetchPosts =() =>{
       axios.get(booksURL).then(response => {
        // console.log(response.data);
        setBooks(response.data);
      }).catch(err=>{
        console.log(err);
      });
        axios.get(popularBooksURL).then(response => {
        // console.log(response.data);
        setpopulaBooks(response.data);
      }).catch(err=>{
        console.log(err);
      });
       axios.get(popularAuthorsURL).then(response => {
        // console.log(response.data);
        setpopularAuthors(response.data);
      }).catch(err=>{
        console.log(err);
      });
      axios.get(popularCategoryURL).then(response => {
        // console.log(response.data);
        setpoularCategories(response.data);
      }).catch(err=>{
        console.log(err);
      });
      }
      setLoading(false);

      fetchPosts();
    }, [])
    const indexOfLastPost = currentPage * booksPerPage;
    const indexOfFirstPost = indexOfLastPost - booksPerPage;
    const currentBooks = books.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
    <>
    <Header/>
    <div className="main-container">
    <div key="left-div" className="left-div">
    <fieldset key="books" className="popular">
      <legend> <strong>Popular Books</strong></legend>
     <ul>
     {
      popularBooks.map(book => {
          return(
            <li key={book.name} className="popular-list-item">
              <Link title={`By: ${book.author.name}`} to="/unauthorized">{book.name}</Link>
            </li>
          )
      })   
     }
      
     </ul>
    </fieldset>
    
    <fieldset key="authors" className="popular">
      <legend> <strong>Popular Authors</strong></legend>
     <ul>
     {
      popularAuthors.map(author => {
          return(
            <li key={author.name} className="popular-list-item">
              <Link  to="/unauthorized">{author.name}</Link>
            </li>
          )
      })   
     }
     </ul>
    </fieldset>
    <fieldset key="categories" className="popular">
      <legend> <strong>Popular Categories</strong></legend>
     <ul>
     {
      poularCategories.map(category => {
          return(
            <li  key={category.name} className="popular-list-item">
              <Link to="/unauthorized">{category.name}</Link>
            </li>
          )
      })   
     }
       
     </ul>
    </fieldset>
    </div>

  
     
      <BookHome books={currentBooks} loading={loading} />
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        currentPage={currentPage}
        paginate={paginate}
      />


    </div>
    </>

      
    )
}

export default Home




