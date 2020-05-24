import React ,{useState ,useEffect} from 'react';
import Header from '../Header';
import './Home.css';
import axios from 'axios';
import { Link } from "react-router-dom";


const Home = () => {
  const [books,setBooks]=useState([]);

  const booksURL = `${process.env.REACT_APP_BACKEND_URL}/books`
 
    useEffect(() => {
      axios.get(booksURL).then(response => {
        console.log(response.data);
        setBooks(response.data);
      }).catch(err=>{
        console.log(err);
      })
    }, [])
 
    return (
    <>    
    <Header/>
    <div className="main-container">
    <div key="left-div" className="left-div">
    <fieldset key="books" className="popular">
      <legend> <strong>Popular Books</strong></legend>
     <ul>
       <li>
       <Link  key="book1" to="/unauthorized">book1</Link>
       </li>
       <li>
       <Link  key="book2" to="/unauthorized">book2</Link>
       </li>
       <li>
       <Link  key="book3" to="/unauthorized">book3</Link>
       </li>
       <li>
       <Link  key="book4" to="/unauthorized">book4</Link>
       </li>
       <li>
       <Link  key="book5" to="/unauthorized">book5</Link>
       </li>
     </ul>
    </fieldset>
    <fieldset key="authors" className="popular">
      <legend> <strong>Popular Authors</strong></legend>
     <ul>
       <li>
       <Link  key="author1" to="/unauthorized">author1</Link>
       </li>
       <li>
       <Link  key="author2" to="/unauthorized">author2</Link>
       </li>
       <li>
       <Link  key="author3" to="/unauthorized">author3</Link>
       </li>
       <li>
       <Link  key="author4" to="/unauthorized">author4</Link>
       </li>
       <li>
       <Link  key="author5" to="/unauthorized">author5</Link>
       </li>
     </ul>
    </fieldset>
    <fieldset key="categories" className="popular">
      <legend> <strong>Popular Categories</strong></legend>
     <ul>
       <li>
       <Link  key="category1" to="/unauthorized">category1</Link>
       </li>
       <li>
       <Link  key="category2" to="/unauthorized">category2</Link>
       </li>
       <li>
       <Link  key="category3" to="/unauthorized">category3</Link>
       </li>
       <li>
       <Link  key="category4" to="/unauthorized">category4</Link>
       </li>
       <li>
       <Link  key="category5" to="/unauthorized">category5</Link>
       </li>
     </ul>
    </fieldset>  
    </div>

      <div key="right-div"  className="right-div">
    
        
      {
        books.map(book => {
          return(
          <Link  key={book.name} to="/unauthorized">
            <div className="card CardDiv">
              
              <img  src={`${process.env.REACT_APP_BACKEND_URL}${book.image}`} width="100%" height="125" alt="Card image cap" className="card-img-top" alt="post"></img>
              <h4 
              className="card-title">{book.name}</h4>
            
            <small>Category : {book.category.name} </small> <br/>
            <hr/>
            <small >By:{book.author.name}</small>
            </div>
          </Link>
          )
          }) 
      }

      </div>    
    </div>
    </>


    )
}

export default Home




