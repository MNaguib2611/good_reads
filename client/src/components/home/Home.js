import React ,{useState } from 'react';
import Header from '../Header';
import './Home.css';
import axios from 'axios';
 


const Home = () => {
   

    return (
    <>    
    <Header/>
    <div className="main-container">
    <div className="left-div">
        afadaddsfsd
    </div>
      <div className="right-div">

        <div  className="card CardDiv">
          <img  src="../../../img/user_avatar.jpg" width="100%" height="100" alt="Card image cap" className="card-img-top" alt="post"></img>
          <h4 
          className="card-title">test</h4>
        <span >Watched</span>
        </div>

        <div  className="card CardDiv">
          <img  src="../../../img/user_avatar.jpg" width="100%" height="100" alt="Card image cap" className="card-img-top" alt="post"></img>
          <h4 
          className="card-title">test</h4>
        <span >Watched</span>
        </div>

        <div  className="card CardDiv">
          <img  src="../../../img/user_avatar.jpg" width="100%" height="100" alt="Card image cap" className="card-img-top" alt="post"></img>
          <h4 
          className="card-title">test</h4>
        <span >Watched</span>
        </div>
        
        <div  className="card CardDiv">
          <img  src="../../../img/user_avatar.jpg" width="100%" height="100" alt="Card image cap" className="card-img-top" alt="post"></img>
          <h4 
          className="card-title">test</h4>
        <span >Watched</span>
        </div>


        <div  className="card CardDiv">
          <img  src="../../../img/user_avatar.jpg" width="100%" height="100" alt="Card image cap" className="card-img-top" alt="post"></img>
          <h4 
          className="card-title">test</h4>
        <span >Watched</span>
        </div>
        
        <div  className="card CardDiv">
          <img  src="../../../img/user_avatar.jpg" width="100%" height="100" alt="Card image cap" className="card-img-top" alt="post"></img>
          <h4 
          className="card-title">test</h4>
        <span >Watched</span>
        </div>



      </div>    
    </div>
    </>


    )
}

export default Home




