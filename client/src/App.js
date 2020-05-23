import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
import AddBook from "./components/admin/book/addBook";
import Unauthorized from './components/unauthorized/Unauthorized';
import auth from "./auth";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
// require('dotenv').config()

const loggedIn = `${process.env.REACT_APP_BACKEND_URL}/logged_in`

function App() {
    const [user, setUser] = useState(false)
    axios.get(loggedIn, {withCredentials: true}).then(response => {
        if (response.data.user) {
            console.log("xxxxxxxxxx",response.data)
            auth.login(() => {
                setUser(true)
            });
          }
        }).catch(err => {
            // setLoggedUser(false);
            console.log(err);
      });

    // axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/5eb36fdd4c430a63c3c3a788`,{withCredentials: true}).then(response => {
    //   if (response.data.user) {
    //       console.log("mmmmmmmm",response.data)
    //     }
    //   }).catch(err => {
    //       // setLoggedUser(false);
    //       console.log(err);
    // });
    
    return (
        <Router>
            <Switch>

                    <Route exact path="/" component={Header}/>

                    <GuestRoute exact path='/login' user={auth.isAuthenticated()} component={Login}/>
                    <GuestRoute exact path='/register' user={auth.isAuthenticated()} component={Register}/>

                    <ProtectedRoute exact path='/my_books' user={auth.isAuthenticated()} component={MyBooksPage}/>
                    <ProtectedRoute exact path='/admin/book' user={auth.isAuthenticated()} component={AddBook} />
                    <Route exact path='/unauthorized' component={Unauthorized}/>

            </Switch>
        </Router>
    );
}

export default App;
