import React from "react";

const Sidebar = () => {
    return(<div className="sidebar">
        <ul className={"sidebar-ul"}>
            <li className="sidebar-li"><a href="#">All</a></li>
            <li className="sidebar-li"><a href="#">Read</a></li>
            <li className="sidebar-li"><a href="#">Currently Read</a></li>
            <li className="sidebar-li"><a href="#">Want To Read</a></li>
        </ul>
    </div>)
}

export default Sidebar