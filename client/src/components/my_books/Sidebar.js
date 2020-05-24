import React from "react";
import {connect} from "react-redux"
import { Link, useHistory } from "react-router-dom";
const Sidebar = (props) => {
    const {status} = props
    return(<div className="sidebar">
        <ul className={"sidebar-ul"}>
            <li className={(status == 0) ? "sidebar-li active":"sidebar-li" }><Link to="/my_books?page=1">All</Link></li>
            <li className={(status == 1) ? "sidebar-li active":"sidebar-li" }><Link to="/my_books?status=1&page=1">Read</Link></li>
            <li className={(status == 2) ? "sidebar-li active":"sidebar-li" }><Link to="/my_books?status=2&page=1">Reading</Link></li>
            <li className={(status == 3) ? "sidebar-li active":"sidebar-li" }><Link to="/my_books?status=3&page=1">Want To Read</Link></li>
        </ul>
    </div>)
}
const mapStateToProps = (state) => {
    return {
        status: state.selectedStatus
    }
}
export default connect(mapStateToProps)(Sidebar);