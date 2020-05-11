const {UserModel} = require('./models/allModels');
const localStrategy =require("passport-local").Strategy;
const bcrypt  = require('bcrypt');

 function initialize(passport) {     
    const authenticateUser =async (username,password,done) =>{
        let user = await UserModel.findOne({ username: username }, function (err, user) {});
        if (user == null) {
            user = await UserModel.findOne({ email: username }, function (err, user) {});
            if (user == null) {
                return done(null,false,{message:'No user with that username'})
            }
        } 

        try {            
            if (await bcrypt.compare(password,user.password) ) {
                return done(null,user )
                
            }else{
                 return done(null,false,{message:'Password incorrect'})
            }
    } catch(e)  {
             done(e) 
        }
    }

    passport.use(new localStrategy(authenticateUser));
    passport.serializeUser((user,done) => done(null,user.id))  
    passport.deserializeUser(async(id,done) => {
        return done(null,await UserModel.findById(id))
    })
}





module.exports =initialize;
