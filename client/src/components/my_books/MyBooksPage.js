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
    // console.log(props)
    const [query, setQuery] = useState({})
    useEffect(() => {
        const query = destructQuery(search);
        console.log("query",query,search)
        setQuery(query)
        // console.log(query['page'],";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        props.dispatch(setStatus(query['status']))
        props.dispatch(setPageNumber(query['page']))
        props.getMyBooks(search)
    }, [search])
    return (<div className="page-container">
        <Header/>
        <div className="body-container">
            <Sidebar/>

            <div className="my-books-container">
                {books.map((book) => (<div key={book.book._id}><BookCard book={book}/>
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
        books: state.books,
        pages: state.pages,
        page: state.page,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyBooks: getMyBooks(dispatch),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksPage);