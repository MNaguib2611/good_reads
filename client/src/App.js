import React from 'react';
import Header from "./components/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// require('dotenv').config()

const authBackground ="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&w=1000&q=80"

function App() {
  
  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <div >
            <Header/>
          </div>
        </Route>
        <Route exact path="/login">
          <div style={{backgroundImage: `url(${authBackground})`}}>
            <Login/>
          </div>
        </Route>
        <Route exact path="/register">
          <div style={{backgroundImage: `url(${authBackground})`}}>
            <Register/>
          </div>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
