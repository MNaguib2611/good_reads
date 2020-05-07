const express = require('express');
// const {UserModel} = require('../models/allModels');
const {ensureAuthentication} = require('../middlewares/auth.js');
const {userController} = require('../controllers/allControllers')
const router = express.Router();










router.get('/',ensureAuthentication, userController.getAllUsers);


router.get('/:id',ensureAuthentication,userController.getOneUser );

router.patch('/profile/:id',ensureAuthentication,userController.updateProfile );

router.patch('/password_update',ensureAuthentication,userController.passwordUpdate )


//we may need a separate router for this

// router.get('/:id/comments', function (req, res) {
//     UserModel.findOne({'_id': req.params.id}).populate('comments').exec((err, user) => {
//         res.json(user.posts);
//     });

// });

// router.get('/:id/comments', function (req, res) {
//     UserModel.findOne({'_id': req.params.id}).populate('books').exec((err, user) => {
//         res.json(user.posts);
//     });
// });

// router.post('/wantToReadBook', function (req, res) {

// });

// router.post('/readBook', function (req, res) {

// });
// router.post('/readingBook', function (req, res) {

// });


module.exports = router;