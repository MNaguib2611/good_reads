import axios from 'axios';
const loggedIn = `${process.env.REACT_APP_BACKEND_URL}/logged_in`

class Auth {
    constructor() {
      this.authenticated = false;
      this.user={}
    }
  
    async login(cb) {
      this.authenticated = true;
      await axios.get(loggedIn,{withCredentials: true}).then(response => {
         this.user=`${response.data.user.firstName} ${response.data.user.lastName}`;
        //  console.log(this.user);
        // this.loggedUser();
      }).then( cb())
    }
  
    logout(cb) {
        const logout = `${process.env.REACT_APP_BACKEND_URL}/logout`
        axios.delete(logout,{withCredentials: true}).then(response => {
            // console.log(response.data.user);
            this.authenticated = false;
            this.user=""
            cb();
        }).catch(err=>{
          console.log(err);
        });
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
    loggedUser() {
        console.log(this.user);
        // return this.user;
    }
  }
  
  export default new Auth();
  