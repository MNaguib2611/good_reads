require('dotenv').config();
const mongoose=require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors')
const flash = require('express-flash');
// const initializePassport = require('./passport-config');
const app = express();
// const {ensureNotAuthentication, ensureAuthentication} = require('./middlewares/auth.js');
// const authorRouter = require('./routes/author');
const {authRouter, authorRouter, adminRouter, userRouter, categoryRouter, bookRouter}   =  require('./routes/allRoutes');
const port = process.env.SESSION_PORT || 3000;







mongoose.connect("mongodb://localhost:27017/good_reads",{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
},(err)=>{
    if (!err) console.log('\x1b[32m%s\x1b[0m','Connected to Mongodb');
    else console.log(err);
    
});

// initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
// )

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// passport intialization
app.use(passport.initialize());
// persistent login session
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.static('public'));







//authentication routes
app.use("/",authRouter);

//admin routes
app.use('/admin', adminRouter);
//###############



// user routes
app.use('/authors', authorRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/books', bookRouter);

const server = app.listen(port, (err) => {
    if (!err) console.log('\x1b[32m%s\x1b[0m', `Server was started on port ${port}`);
});