import React from 'react';
import Header from "./components/Header";
import Login from "./components/auth/Login";


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (

    <Router>
    <div>
     <Navbar handleSearchedString={this.handleSearchedString} />
      <Switch>
        <Route exact path="/">
        <div >
          <Header/>
        </div>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
