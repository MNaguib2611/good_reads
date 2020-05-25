import React from 'react';
import './Home.css';
import { Link } from "react-router-dom";
const BookHome = ({ books, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div key="right-div"  className="right-div">
      {
        books.map(book => {
          return(
          <Link  key={book.name} to="/unauthorized">
            <div className="card CardDiv">

              <img  src={`${process.env.REACT_APP_BACKEND_URL}${book.image}`} width="100%" height="120" alt="Card image cap" className="card-img-top" alt="post"></img>
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
  );
};

export default BookHome;
