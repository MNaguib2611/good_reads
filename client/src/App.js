import React from 'react';
import Home from "./components/home/Home";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
import CreateAuthor from "./components/author/CreateAuthor";
import Books from "./components/admin/book/books";
import Unauthorized from './components/unauthorized/Unauthorized';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
// require('dotenv').config()


function App() {
   
    return (
        <Router>
            <Switch>
                    {/* routes available for all */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path='/admin/books' component={Books} />
                    <Route exact path='/unauthorized' component={Unauthorized}/>


                    {/* route available only if NOT authenticated */}
                    <GuestRoute exact path='/login'  component={Login}/>
                    <GuestRoute exact path='/register'  component={Register}/>
                    

                     {/* route available only if  authenticated */}
                    <ProtectedRoute exact path='/my_books'  component={MyBooksPage}/>

                    {/* routes available for admins only */}
                    <AdminRoute exact path='/admin'  component={Home}/>

            </Switch>
        </Router>
    );
}

export default App;
