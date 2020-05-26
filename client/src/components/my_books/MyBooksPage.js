import React, {useEffect, useState} from "react";
import Header from "../Header";
import '../../styles/my_books.scss';
import Sidebar from "./Sidebar";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import {connect} from 'react-redux'
import {getMyBooks} from "../../API/my_books_api";
import {destructQuery, pageURL} from "../../utils/utils";
import {setPageNumber, setStatus} from "../../actions/my_books_action";

const MyBooksPage = (props) => {
    const {books} = props;
    const {location: {search}} = props;
    const [query, setQuery] = useState({})
    useEffect(() => {
        const query = destructQuery(search);
        setQuery(query)
        props.dispatch(setStatus(query['status']))
        props.dispatch(setPageNumber(query['page']))
        props.getMyBooks(search)
    }, [search])
    return (<div className="page-container">
        <Header />
        <div className="body-container">
            <Sidebar />
            <div className={props.searchResultIsExist ? "my-books-container go-back" : "my-books-container"}>
                {books.length ===0 ?<h1>No Books Available</h1> : books.map((book) => (<div key={book.book._id}><BookCard bookID={book.book._id}/>
                    <hr className="solid"/>
                </div>))}
                <Pagination page={props.page}
                            hasNext={props.pages.hasNext}
                            hasPrevious={props.pages.hasPrevious}
                            prevURL={pageURL('/my_books', query, {...query, page: Number(props.page) - 1})}
                            nextURL={pageURL('/my_books', query, {...query, page: Number(props.page) + 1})}/>
            </div>
        </div>
    </div>)
}

const mapStateToProps = (state) => {

    return {
        books: state.myBooksReducer.books,
        pages: state.myBooksReducer.pages,
        page: state.myBooksReducer.page,
        searchResultIsExist:state.searchReducer.result.length > 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyBooks: getMyBooks(dispatch),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksPage);