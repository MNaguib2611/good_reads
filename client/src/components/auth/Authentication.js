import React ,{useState , useEffect} from 'react';
import { useInput } from './hooks/input-hook.js';
import axios from 'axios';
import './Authentication.css';
import { Link, useHistory } from "react-router-dom";
const Authentication = (props) => {
	const history = useHistory();
	var [errorsLogin,setErrorsLogin]=useState("");
	const [errorsRegister,setErrorsRegister]=useState("");

	const { value:usernameLogin, bind:bindUsernameLogin, reset:resetUsernameLogin } = useInput('');
	const { value:passwordLogin, bind:bindPasswordLogin, reset:resetPasswordLogin } = useInput('');



	

	const loginUrl=`${process.env.REACT_APP_BACKEND_URL}/login`
	// const registerUrl=`${process.env.REACT_APP_BACKEND_URL}/register`

	const handleChange = (e,callback)=> {
		const {target:{value}} = e;
		callback(value);
	  }
	  
	const handleLoginSubmit = (e)=> {
	e.preventDefault();
	// alert(`Submitting Name ${usernameLogin} ${passwordLogin}`);
	//   console.log(e);
	// const { username, password } = this.state;
	axios.post(loginUrl,
		{
			username: usernameLogin,
			password: passwordLogin
		},{
			withCredentials: true ,
		}).then(response => {
			console.log(response.data);
			if (response.status==250){
				setErrorsLogin(response.data.message)
			}else if(response.status==200){
				history.push("/");
			}else if(response.status==201){
				history.push("/admin");
			}	
		})
		.catch(error => {
		console.log("login error", error);
		});
	resetUsernameLogin();
	resetPasswordLogin();
	}



    return (
<div className="login-wrap">
    <div className="login-html">
    <input id="tab-1" type="radio" name="tab" className="sign-in" checked onChange={handleChange}/>
        <label htmlFor="tab-1" className="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up"/>
        <label htmlFor="tab-2" className="tab">Sign Up</label>
		<div className="login-form">
		<form onSubmit={handleLoginSubmit}>
			<div className="sign-in-htm">
				<div className="group">
					<label htmlFor="user-login" className="label">Username</label>
					<input id="user-login" name="username" type="text" className="input"
						{...bindUsernameLogin}
					/>
				</div>
				<div className="group">
					<label htmlFor="pass-login" className="label" >Password</label>
					<input id="pass-login" type="password" name="password" className="input" data-type="password" {...bindPasswordLogin}/>
				</div>
				<div className="group">
					<input id="check" type="checkbox" className="check" />
					<label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
				</div>
				<div className="group">
					<input type="submit" className="button" value="Sign In"/>
				</div>
				<div className="hr"></div>
				<div className="foot-lnk">
					<a href="#forgot">Forgot Password?</a>
				</div>

				{errorsLogin?<div className="errors-div">
				  <small> {errorsLogin}</small>
				</div>:null}
				
			</div>
            </form>
			<div className="sign-up-htm">
				<div className="group">
					<label htmlFor="user" className="label">Username</label>
					<input id="user" type="text" name="username" className="input"/>
				</div>
				<div className="group">
					<label htmlFor="firstName" className="label">First Name</label>
					<input id="firstName" type="text" name="firstName" className="input" />
				</div>
				<div className="group">
					<label htmlFor="lastName" className="label">Last Name</label>
					<input id="lastName" type="text" name="lastName" className="input" />
				</div>
				<div className="group">
					<label htmlFor="email" className="label">Email Address</label>
					<input id="email" type="text" name="email" className="input" />
				</div>
				<div className="group">
					<label htmlFor="password" className="label">Password</label>
					<input id="password" type="password" name="password" className="input" data-type="password" />
				</div>
				<div className="group">
					<label htmlFor="password-confirm" className="label">Repeat Password</label>
					<input id="password-confirm" type="password" name="password-confirm" className="input" data-type="password" />
				</div>
				<div className="group">
					<input type="submit" className="button" value="Sign Up" />
				</div>
				<div style={{textAlign:"center"}}>
					<label htmlFor="tab-1" >Already Member?</label>
				</div>
				<div className="errors-div">
					{/* {errorsRegister.map((err)=> <li>err</li>)} */}
				</div>
			</div>
		</div>
	</div>
</div>

)}

export default Authentication