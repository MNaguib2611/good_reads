import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux';
import {updateBookStatus} from "../../API/my_books_api";
const ChangeStateBtn = (props) => {
    const {currentStatus} = props;
    const {book_id} = props;
    const handleChangeStatus = (e) => {
        console.log(e.target.text)
        const status = e.target.text.toLowerCase()
        props.updateBookStatus(book_id,status)
    }
    return (<div className="dropdown-btn-container">
        <div className="btn-container">
            <button className="main-btn" disabled={true}>{currentStatus}</button>
            <div className="dropdown">
                <button className="main-btn" style={{'borderLeft': '1px solid #fff'}}>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </button>
                <div className="dropdown-content">
                    <a onClick={handleChangeStatus}>Read</a>
                    <a onClick={handleChangeStatus}>Reading</a>
                    <a onClick={handleChangeStatus}>Want To Read</a>
                </div>
            </div>
        </div>

    </div>)
}



const mapDispatchToProps = (dispatch) => {
    return {
        updateBookStatus: updateBookStatus(dispatch),
        dispatch
    }
}


export default connect(null,mapDispatchToProps)(ChangeStateBtn)