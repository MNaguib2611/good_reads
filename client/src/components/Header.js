import React from 'react'
import '../styles/header.scss';
const Header = () => {
    return (<div className="header">
        <div className="nav-container">
            <ul>
                <li className="nav-list"><a href="#">Home</a></li>
                <li className="nav-list"><a href="#">Categories</a></li>
                <li className="nav-list"><a href="#">Books</a></li>
                <li className="nav-list"><a href="#">Authors</a></li>
                <li className="nav-list"><a href="#">My Books</a></li>
            </ul>
        </div>
        <div className="search-container">
            <input className="search-input" placeholder="search Books, Categories, Authors"/>
        </div>
        <div className="user-profile-container">
            <img src="../../img/user_avatar.jpg" alt="Avatar" className="avatar"/>
            <p className="user-name">Ahemd Adel</p>
        </div>
        <div className="logout-container">
            <ul>
                <li className="logout-list"><a href="#">Logout</a></li>
            </ul>
        </div>
    </div>)
}

export default Header