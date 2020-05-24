import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
import Unauthorized from './components/unauthorized/Unauthorized';
import { connect } from 'react-redux';
import  * as loggedUser from './actions/logged_user_actions';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
// require('dotenv').config()

const loggedIn = `${process.env.REACT_APP_BACKEND_URL}/logged_in`

function App(props) {
    const [user, setUser] = useState(false)
    const history = useHistory();
    axios.get(loggedIn, {withCredentials: true}).then(response => {
        if (response.data.user) {
            console.log("xxxxxxxxxx",response.data)
                setUser(true)
                props.storeUser(response.data.user);
          }else{
            setUser(false)
            history.push("/")
          }
        }).catch(err => {
            // setLoggedUser(false);
            console.log(err);
      });
    
      
    return (
        <Router>
            <Switch>

                    <Route exact path="/"  component={Header}/>

                    <GuestRoute exact path='/login' user={user} component={Login}/>
                    <GuestRoute exact path='/register' user={user} component={Register}/>

                    <ProtectedRoute exact path='/my_books' user={user} component={MyBooksPage}/>
                    <Route exact path='/unauthorized'  component={Unauthorized}/>

            </Switch>
        </Router>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedUser: state.loggedUser
  }
};

const mapDispatchToProps = (dispatch) => {
  console.log("usersads");
  return {
    storeUser: user => {
      console.log(user);
      dispatch(loggedUser.addLggedUser(user));}
  }
};  

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);