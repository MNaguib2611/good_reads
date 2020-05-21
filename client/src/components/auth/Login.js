import React ,{useState , useEffect} from 'react';
import { useInput } from './hooks/input-hook.js';
import axios from 'axios';
import './Authentication.css';
import { Link, useHistory } from "react-router-dom";
const Authentication = (props) => {
	const history = useHistory();
	const [checkedV,setCheckedV]=useState(true);
	const [errorsLogin,setErrorsLogin]=useState("");
	const [errorsRegister,setErrorsRegister]=useState("");

	const { value:usernameLogin, bind:bindUsernameLogin, reset:resetUsernameLogin } = useInput('');
	const { value:passwordLogin, bind:bindPasswordLogin, reset:resetPasswordLogin } = useInput('');

	const { value:usernameRegister, bind:bindUsernameRegister, reset:resetUsernameRegister } = useInput('');
	const { value:passwordRegister, bind:bindPasswordRegister, reset:resetPasswordRegister } = useInput('');
	const { value:passConfRegister, bind:bindPassConfRegister, reset:resetPassConfRegister } = useInput('');
	const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
	const { value:firstName, bind:bindFirstName, reset:resetFirstName } = useInput('');
	const { value:lastName, bind:bindLastName, reset:resetLastName } = useInput('');

	

	const loginUrl=`${process.env.REACT_APP_BACKEND_URL}/login`
	const registerUrl=`${process.env.REACT_APP_BACKEND_URL}/register`


	  
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
	resetPasswordLogin();
	}


    return (
<div className="login-wrap">
    <div className="login-html">
    <input id="tab-1" type="radio" name="tab" className="sign-in" checked/>
        <label htmlFor="tab-1" className="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" className="sign-up"/>
        <label htmlFor="tab-2" className="tab">
			<Link  to="/register">Sign Up</Link>
		</label>
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
		</div>
	</div>
</div>

)}

export default Authentication