import React,{useEffect} from "react";
import Header from "../Header";
import '../../styles/author_details.scss'
import {connect} from 'react-redux'
import {getAuthorData, getAuthorBooks} from "../../API/author_api";
import {Link} from "react-router-dom";
import ChangeStateBtn from "../my_books/ChangeStateBtn";
import ReactStars from "react-rating-stars-component";
const AuthorPage = (props) => {
    console.log(props.computedMatch.params.id)
    const id = props.computedMatch.params.id
    const {author,books} = props
    console.log(books)
    useEffect(()=>{
        props.getAuthorData(id)
        props.getAuthorBooks(id)
    },[])

    return(<div className='page-container'>
        <Header/>
        <div className="x-container">

            <div className="x-author-info-container">
                <div className="x-image-container">
                    <img src={author.image ? `${process.env.REACT_APP_BACKEND_URL}${author.image}` : "https://www.esm.rochester.edu/uploads/NoPhotoAvailable-335x419.jpg"} alt={author.name}/>
                </div>
                <div className="x-author-info">
                    <h3>{author.name}</h3>
                    <h5>{author.dateOfBirth}</h5>
                    <div className="module line-clamp">
                        <p>{author.bio}</p>
                    </div>
                </div>
            </div>

            {books.map((book)=>{
                return (<div className="book-card">
                    <div className="cover-container">
                        <img src={book.image ? `${process.env.REACT_APP_BACKEND_URL}${book.image}` : "https://www.esm.rochester.edu/uploads/NoPhotoAvailable-335x419.jpg"} alt={book.name}/>
                    </div>
                    <div className="book-info">
                        <Link to={`/book/${book._id}`}><h3>{book.name}</h3></Link>
                        <div className="module line-clamp">
                            <p className="book-card-desc ">{book.description}</p>
                        </div>
                        <div className="rating-container">
                            <p className="rate-text">Avg Rate: </p>
                            <ReactStars
                                count={5}
                                size={24}
                                value={book.avgRate}
                                edit={false}
                                color2={'#F99A3D'} />
                            <p className="rate-text">{book.rate.length} ratings </p>
                        </div>
                    </div>
                </div>)
            })}
        </div>
    </div>)
}

const mapStateToProps = (state) => {

    return {
        author: state.authorReducer.author,
        books: state.authorReducer.books,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorData: getAuthorData(dispatch),
        getAuthorBooks: getAuthorBooks(dispatch),
        dispatch
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AuthorPage)