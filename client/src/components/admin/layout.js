import React from 'react';
import '../../styles/layout.scss';
import Header from "../Header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
    return (
        <div className="dashboard">
            <Header dashboard={true}/>
            <Sidebar>
                {children}
            </Sidebar>
        </div>
    );
};

export default Layout;