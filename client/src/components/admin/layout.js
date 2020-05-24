import React from 'react';
import '../../styles/layout.scss';
import { useHistory } from "react-router-dom";
import Header from "../Header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
    const history = useHistory();

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