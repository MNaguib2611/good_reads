import React from 'react';
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyBooksPage from "./components/my_books/MyBooksPage";
// import AddBook from "./components/admin/book/addBook";
import Unauthorized from './components/unauthorized/Unauthorized';
import AddCategory from './components/admin/category/AddCategory';
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
                    <Route exact path='/categories/add' component={AddCategory} />
              </Switch>
          </Router>
    );
}

export default App;
