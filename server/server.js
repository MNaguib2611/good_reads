// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const session = require('express-session');
// const passport = require('passport');
// const cors = require('cors')
// const flash = require('express-flash');
// const initializePassport = require('./passport-config');
// const app = express();
// const {ensureNotAuthentication, ensureAuthentication} = require('./middlewares/auth.js');
// const authorRouter = require('./routes/author');
//
//
// //users will be from UserModel
// const users = []
// //users will be from UserModel (or AdminModel)
// const admins = []
//
//
// initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
// )
//
//
// // Body Parser Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
//
// app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
//
// // passport intialization
// app.use(passport.initialize());
// // persistent login session
// app.use(passport.session());
//
// app.use(cors());
// app.use(express.json());
//
//
// app.get("/fail", (req, res) => {
//     res.json({"message": "Login Failed"})
// })
//
//
// app.get("/success", (req, res) => {
//     // res.json({"message":"Login succeeded"})
//     res.json(users);
// })
//
//
// app.get("/logoutToView", (req, res) => {
//     res.json({"message": "You should logout to view that page"})
// })
//
// app.get("/loginToView", ensureNotAuthentication, (req, res) => {
//     res.json({"message": "Please login to view this page."});
// })
//
//
// app.get("/login", ensureNotAuthentication, (req, res) => {
//     res.json({"message": "You can login here."});
// })
//
// app.post("/login", ensureNotAuthentication, passport.authenticate('local', {
//     successRedirect: '/success',
//     failureRedirect: '/fail',
//     failureFlash: true
// }))
//
// app.get("/register", ensureNotAuthentication, (req, res) => {
//     res.json({"message": "Please Login to view this page ."});
// })
//
// app.post("/register", ensureNotAuthentication, async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             "id": req.body.email,
//             "name": req.body.name,
//             "email": req.body.email,
//             "password": hashedPassword
//         })
//         res.json({"message": "Regstiration Complete"});
//     } catch {
//         res.json({"error": "Something went wrong"});
//     }
//
// })
//
//
// app.delete('/logout', (req, res) => {
//     if (req.isAuthenticated()) {
//         req.logout();
//         res.json({"message": "logged out Successfully"})
//     } else {
//         res.json({"message": "Not allowed"})
//     }
// })
//
//
// app.get("/", ensureAuthentication, (req, res) => {
//     res.json({"message": `welcome ${req.user.name}`});
// })
//
// app.use('/author', authorRouter);
//
// // app.listen();
// const server = app.listen(process.env.SESSION_PORT, (err) => {
//     if (!err) console.log('\x1b[32m%s\x1b[0m', `Server was started on port ${process.env.SESSION_PORT}`);
// });


const express  = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const authorRouter = require('./routes/author')

const app = express()
const port = process.env.SESSION_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb://localhost:27017/good_reads",{
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 10000
}, (err) => {
    if (!err) console.log('started connection to mongodb');
    else console.log(err);
});

app.get('/', (req, res) => res.send('hello world'))

app.use('/author', authorRouter);

app.listen(port, (err) => {
    if(!err) console.log(`started server on port ${port}`);
});