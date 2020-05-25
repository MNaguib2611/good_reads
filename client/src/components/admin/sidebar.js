import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAt, faThLarge, faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState(1);

    const changeOption = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="layout_container">
            <div className="side nav-container">
                <div className="card">
                    <ul>
                        <li className="nav-list" onClick={() => changeOption(1)} style={{backgroundColor: selectedOption == 1 && '#F56D3A'}}> <Link to="/admin/categories/"><FontAwesomeIcon icon={faThLarge} size="lg"/><span>Categories</span></Link></li>
                        <li className="nav-list" onClick={() => changeOption(2)} style={{backgroundColor: selectedOption == 2 && '#F56D3A'}}><FontAwesomeIcon icon={faBook} size="lg"/><span>Books</span></li>
                        <li className="nav-list" onClick={() => changeOption(3)} style={{backgroundColor: selectedOption == 3 && '#F56D3A'}}><FontAwesomeIcon icon={faAt} size="lg"/><span>Authors</span></li>
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