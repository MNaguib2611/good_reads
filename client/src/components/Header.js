import React  from 'react';
import '../styles/header.scss';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./search_bar/SearchBar";




const Header = ({ dashboard }) => {

    const history = useHistory();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const handleLogout =()=>{
        const logout = `${process.env.REACT_APP_BACKEND_URL}/logout`
        axios.delete(logout,{withCredentials: true}).then(response => {
            // console.log(response.data);
            localStorage.removeItem("loggedUser");
            history.push("/login");
        }).catch(err=>{
          console.log(err);
        });
      }
      console.log(loggedUser)
    return (<div className="header">
        <div className="nav-container">
            <ul>
                <li className="nav-list"><Link to="/">Home</Link></li>
                {!dashboard && loggedUser && !loggedUser.isAdmin &&
                <>
                <li className="nav-list"><Link  to="/categories">Categories</Link></li>
                <li className="nav-list"><a href="#">Books</a></li>
                <li className="nav-list"><Link to="/create-author">Authors</Link></li>
                <li className="nav-list"><Link  to="/my_books?page=1">My Books</Link></li>
                </> ||
                <li className="nav-list"><Link  to="/admin">Dashboard</Link></li>
                }
            </ul>
        </div>
        <SearchBar/>
        
        {loggedUser?
        <>
        <div className="user-profile-container">
            <img src="../../img/user_avatar.jpg" alt="Avatar" className="avatar"/>
            <p className="user-name">{`${loggedUser.firstName}  ${loggedUser.lastName} ` }</p>
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