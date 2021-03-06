import React ,{useState} from 'react';
import { useInput } from './hooks/input-hook.js';
import axios from 'axios';
import './Authentication.css';
import { Link, useHistory } from "react-router-dom";
const authBackground ="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&w=1000&q=80"

const Authentication = (props) => {
	const history = useHistory();

	const [errorsRegister,setErrorsRegister]=useState("");

	const { value:usernameRegister, bind:bindUsernameRegister  } = useInput('');
	const { value:passwordRegister, bind:bindPasswordRegister } = useInput('');
	const { value:passConfRegister, bind:bindPassConfRegister } = useInput('');
	const { value:email, bind:bindEmail } = useInput('');
	const { value:firstName, bind:bindFirstName } = useInput('');
	const { value:lastName, bind:bindLastName } = useInput('');

	const registerUrl=`${process.env.REACT_APP_BACKEND_URL}/register`;
	const handleChange =(e) =>{}



	const handleRegisterSubmit = (e)=> {
		e.preventDefault();
		if (passwordRegister === passConfRegister) {
			axios.post(registerUrl,
				{
					username:usernameRegister,
					password:passwordRegister,
					email,
					firstName,
					lastName
				},{
					withCredentials: true ,
				}).then(response => {
					console.log(response);
					if (response.status==250){
						setErrorsRegister(response.data.message)
					}else if(response.status==200){
						history.push("/login");
					}	
				})
				.catch(error => {
				console.log("login error", error);
				});
		} else {
			setErrorsRegister("Passwords don't match");
		}
		
		}
    return (
<div style={{backgroundImage: `url(${authBackground})`}}>
<br />
<Link className="home-link" to="/">Home</Link>
<div className="login-wrap">
    <div className="login-html">
    <input id="tab-1" type="radio" name="tab" className="sign-in" />
	<label htmlFor="tab-1" className="tab">
	<Link  to="/login">Sign In</Link>
	
	</label>
	<input id="tab-2" type="radio" name="tab" className="sign-up" checked onChange={handleChange}/>
	<label htmlFor="tab-2" className="tab">Sign Up</label>
		<div className="login-form">
		<div className="sign-up-htm">
			<form onSubmit={handleRegisterSubmit}>
				<div className="group">
					<label htmlFor="firstName" className="label">First Name</label>
					<input id="firstName" type="text" name="firstName" className="input" minLength="2" required
					  {...bindFirstName} />
				</div>
				<div className="group">
					<label htmlFor="lastName" className="label">Last Name</label>
					<input id="lastName" type="text" name="lastName" className="input"   minLength="2" required
						{...bindLastName}
					/>
				</div>
				<div className="group">
					<label htmlFor="user" className="label">Username</label>
					<input id="user" type="text" name="username" className="input" required
						{...bindUsernameRegister}
					/>
				</div>
				<div className="group">
					<label htmlFor="email" className="label">Email Address</label>
					<input id="email" type="email" name="email" className="input"  required
							{...bindEmail}
					/>
				</div>
				<div className="group">
					<label htmlFor="password" className="label">Password</label>
					<input id="password" type="password" name="password" className="input" data-type="password" 
							{...bindPasswordRegister}  minLength="8" required
					/>
				</div>
				<div className="group">
					<label htmlFor="password-confirm" className="label">Repeat Password</label>
					<input id="password-confirm" type="password" name="password-confirm" className="input" data-type="password" 
							{...bindPassConfRegister}  minLength="8" required
					/>
				</div>
				<div className="group">
					<input type="submit" className="button" value="Sign Up" />
				</div>
			</form>
				<div style={{textAlign:"center"}}>
					<label htmlFor="tab-1" >Already Member?</label>
				</div>
					{errorsRegister?<div className="errors-div">
				  <small> {errorsRegister}</small>
				</div>:null}
			</div>
		</div>
	</div>
</div>
</div>

)}

export default Authentication