import React ,{useState } from 'react';
import '../styles/header.scss';
import axios from 'axios';
import auth from "../auth";
import { Link, useHistory } from "react-router-dom";
const loggedIn = `${process.env.REACT_APP_BACKEND_URL}/logged_in`



const Header = ({ dashboard }) => {
    const [user,setUser]=useState("");
    axios.get(loggedIn,{withCredentials: true}).then(response => {
        if (response.data.user) {
            setUser(`${response.data.user.firstName} ${response.data.user.lastName}`);
        }
    });
    const history = useHistory();
    const handleLogout =()=>{
        auth.logout(() => {
            history.push("/login");
        });
      }

    return (<div className="header">
        <div className="nav-container">
            <ul>
                <li className="nav-list"><a href="/">Home</a></li>
                {!dashboard &&
                <>
                <li className="nav-list"><a href="#">Categories</a></li>
                <li className="nav-list"><a href="#">Books</a></li>
                <li className="nav-list"><a href="#">Authors</a></li>
                <li className="nav-list"><Link  to="/my_books?page=1">My Books</Link></li>
                </>
                }
            </ul>
        </div>
        <div className="search-container">
            <input className="search-input" placeholder="search Books, Categories, Authors"/>
        </div>
        
        {auth.isAuthenticated()?
        <>
        <div className="user-profile-container">
            <img src="../../img/user_avatar.jpg" alt="Avatar" className="avatar"/>
            <p className="user-name">{user}</p>
        </div>
        <div className="logout-container">
            <ul>
                <li className="logout-list"><a  onClick={handleLogout} >Logout</a></li>
            </ul>
        </div>
        </>:
        <>
        <div className="logout-container">
            <ul>
            <li className="logout-list"><Link  to="/login"> Sign In</Link></li>
            </ul>
        </div>
        <div className="logout-container">
            <ul>
                <li className="logout-list"><Link  to="/register"> Sign Up</Link></li>
            </ul>
        </div>
        </>
        }
       
    </div>)
}

export default Header