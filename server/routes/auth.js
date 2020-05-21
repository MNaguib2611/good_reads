const {UserModel} = require('../models/allModels');
const passport = require('passport');
const {ensureNotAuthentication, ensureAuthentication} = require('../middlewares/auth.js');
const initializePassport = require('../passport-config');
const router = require('express').Router();


//not needed as the registeraton form will be in the home page
// router.get("/register", ensureNotAuthentication, (req, res) => {
//     res.json({"message": "Please Login to view this page ."});
// })


initializePassport(passport)


/*
*   POST /register
*   return user data
*   Or error object
*   "errors": {
        "email": {
            "message": "Email is required",
            * }
    * }
* */
router.post('/register', ensureNotAuthentication, async function (req, res) {
    const {
      body: {
        firstName,
        lastName,
        username,
        email,
        password,
        image,
      }
    } = req;
    // let password = bcrypt.hashSync(password, 10);
    try {
        const user = new UserModel({
            firstName,
            lastName,
            username,
            password,
            email,
            image,
        });
        await user.save();
        return res.status(200).send(user);
    } catch (e) {
        if (e.errmsg && e.errmsg.indexOf('duplicate key error') !== -1) {
            return res.status(500).send({
                errors: {
                    [Object.keys(e.keyValue)[0]]: {
                        "message": `${Object.keys(e.keyValue)[0]}  already exists`
                    }
                }
            })
        }
        return res.status(500).send(e)
    }

    // user.save(function (err) {
    //   if (!err)  res.status(200).json({"message": "Regstiration Complete."});
    //   else {
    //       // console.log(err);
    //       // res.status(500).json({"error": "Something went wrong!"});
    //       res.status(500).json(err);
    //     }
    // });
  });



router.get("/fail", (req, res) => {
    res.status(250).json({"message": "Login Failed"})
})


router.get("/success", (req, res) => {
    if (req.user.isAdmin) {
        res.status(201).json({"message": "Admin Login success"})     
    } else {
        res.status(200).json({"message": "Login success"})     
    }
})


router.get("/logoutToView", (req, res) => {
    res.status(250).json({"message": "You should logout to view that page"})
})

router.get("/loginToView", ensureNotAuthentication, (req, res) => {
    res.json({"message": "Please login to view this page."});
})


router.get("/login", ensureNotAuthentication, (req, res) => {
    res.status(200).json({"message": "You can login here."});
})

router.post("/login", ensureNotAuthentication, passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/fail',
    failureFlash: true
}))





router.delete('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.json({"message": "logged out Successfully"})
    } else {
        res.json({"message": "Not allowed"})
    }
})


router.get("/", ensureAuthentication, (req, res) => {
    res.json({"message": `welcome ${req.user.getFullName()}`});
})



router.get("/notAuthorized", (req, res) => {
    res.status(401).json({"message": "unauthorized"});
})




module.exports = router;
