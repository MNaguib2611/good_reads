import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAt, faThLarge, faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const path = window.location.pathname;

    useEffect(() => {
        if (path.includes('admin/categories'))
            setSelectedOption(1);
        else if (path.includes('admin/books'))
            setSelectedOption(2);
        else if (path.includes('admin/authors'))
            setSelectedOption(3);
        else
            setSelectedOption(1);
    }, [path]);

    return (
        <div className="layout_container">
            <div className="side nav-container">
                <div className="card">
                    <ul>
                        <li className="nav-list" style={{backgroundColor: selectedOption === 1 && '#F56D3A'}}><Link to="/admin/categories/"><FontAwesomeIcon icon={faThLarge} size="lg"/><span>Categories</span></Link></li>
                        <li className="nav-list" style={{backgroundColor: selectedOption === 2 && '#F56D3A'}}><Link to="/admin/books/"><FontAwesomeIcon icon={faBook} size="lg"/><span>Books</span></Link></li>
                        <li className="nav-list" style={{backgroundColor: selectedOption === 3 && '#F56D3A'}}><Link><FontAwesomeIcon icon={faAt} size="lg"/><span>Authors</span></Link></li>
                    </ul>
                </div>
            </div>
            <div className="content">
                <div className="body">
                    {children}
                </div>
            </div>
            
        </div>
    );
};

export default Sidebar;