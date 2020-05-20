import React from "react";
import Header from "../Header";
import '../../styles/my_books.scss';

const MyBooksPage = () => {
    return (<div className="page-container">
        <Header/>
        <div className="body-container">
            <div className="sidebar">
                <ul className="sidebar-ul">
                    <li className="sidebar-li"><a href="#">All</a></li>
                    <li className="sidebar-li"><a href="#">Read</a></li>
                    <li className="sidebar-li"><a href="#">Currently Read</a></li>
                    <li className="sidebar-li"><a href="#">Want To Read</a></li>
                </ul>
            </div>

            <div className="my-books-container">

            </div>
        </div>
    </div>)
}

export default MyBooksPage