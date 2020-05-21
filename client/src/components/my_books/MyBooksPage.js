import React from "react";
import Header from "../Header";
import '../../styles/my_books.scss';
import Sidebar from "./Sidebar";
import BookCard from "../BookCard";

const MyBooksPage = () => {
    return (<div className="page-container">
        <Header/>
        <div className="body-container">
            <Sidebar/>

            <div className="my-books-container">
                <BookCard/>
                <BookCard/>
                <BookCard/>
                <BookCard/>
            </div>
        </div>
    </div>)
}

export default MyBooksPage