import React from 'react';
import '../../styles/layout.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAt, faThLarge, faBook } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header";

const Layout = ({ children }) => {
    const history = useHistory();
    // const handleLogout =()=>{
    //     const logout = `${process.env.REACT_APP_BACKEND_URL}/logout`
    //     axios.delete(logout,{withCredentials: true}).then(response => {
    //         console.log(response.data);
    //         localStorage.removeItem("loggedUser");
    //         history.push("/login");
    //     }).catch(err=>{
    //       console.log(err);
    //     });
    //   }

    return (
        <div>
            <div className="header">
                <Header dashboard={true}/>
            </div>
            <div className="container">
                <div className="side nav-container">
                    <div className="card">
                        <ul>
                            <li className="nav-list"><FontAwesomeIcon icon={faThLarge} size="lg"/><span>Categories</span></li>
                            <li className="nav-list"><FontAwesomeIcon icon={faBook} size="lg"/><span>Books</span></li>
                            <li className="nav-list"><FontAwesomeIcon icon={faAt} size="lg"/><span>Authors</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="body">
                        {children}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Layout;