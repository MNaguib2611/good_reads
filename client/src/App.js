// import React from 'react';
import React ,{useState , useEffect} from 'react';
import axios from 'axios';
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
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

    axios.get(loggedIn,{withCredentials: true}).then(response => {
      if (response.data.user) {
        auth.login(() => {
					// history.push("/");
				});
      }
    }).catch(err=>{
      // setLoggedUser(false);
      console.log(err);
    });


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Header} />
        
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
          


        <ProtectedRoute exact path="/my_books" component={MyBooksPage} />  
       
      </Switch>
  </Router>
  );
}

export default App;
