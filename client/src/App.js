import React from 'react';
import Header from "./components/Header";
import Authentication from "./components/auth/Authentication";
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
        <Route exact path="/authenticate">
          <div style={{backgroundImage: `url(${authBackground})`}}>
            <Authentication/>
          </div>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
