import React from 'react';
import Home from "./components/home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
import AddBook from "./components/admin/book/addBook";
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

                    <Route exact path="/" component={Home}/>

                    <GuestRoute exact path='/login'  component={Login}/>
                    <GuestRoute exact path='/register'  component={Register}/>
                    <ProtectedRoute exact path='/my_books'  component={MyBooksPage}/>
                    <Route exact path='/unauthorized' component={Unauthorized}/>

            </Switch>
        </Router>
    );
}

export default App;
