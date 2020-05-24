import React from 'react';
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
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

                    <Route exact path="/" component={Header}/>

                    <GuestRoute exact path='/login'  component={Login}/>
                    <GuestRoute exact path='/register'  component={Register}/>
                    <ProtectedRoute exact path='/my_books'  component={MyBooksPage}/>
                    <Route exact path='/unauthorized' component={Unauthorized}/>

                    <GuestRoute exact path='/admin/books' component={Books} />

            </Switch>
        </Router>
    );
}

export default App;
