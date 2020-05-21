import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";

const ChangeStateBtn = () => {
    return (<div className="dropdown-btn-container">
        <div className="btn-container">
            <button className="main-btn">Want To Read</button>
            <div className="dropdown">
                <button className="main-btn" style={{'borderLeft': '1px solid #fff'}}>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </button>
                <div className="dropdown-content">
                    <a href="#">Read</a>
                    <a href="#">Currently Read</a>
                    <a href="#">Want To Read</a>
                </div>
            </div>
        </div>

    </div>)
}

export default ChangeStateBtn