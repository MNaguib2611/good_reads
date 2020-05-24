const express = require('express');
// const {UserModel} = require('../models/allModels');
const {ensureAuthentication} = require('../middlewares/auth.js');
const {userController} = require('../controllers/allControllers')
const router = express.Router();









// router.get('/books',ensureAuthentication,userController.getUserBooks);

router.get('/',ensureAuthentication, userController.getAllUsers);

router.get('/search',ensureAuthentication,userController.search);

router.get('/:id',ensureAuthentication,userController.getOneUser );

router.patch('/profile/:id',ensureAuthentication,userController.updateProfile );

router.patch('/password_update',ensureAuthentication,userController.passwordUpdate )

/*
*
* POST /users/:user_id/books/:id
* Return { "message": "your Shelves updated successfully" } if updated successfully
* Or 500 status code if there is an error
*
* */
router.post('/:user_id/books/:id',ensureAuthentication,userController.manageShelves);


router.get('/:user_id/books',ensureAuthentication,userController.getUserBooks);


//we may need a separate router for this
// router.get('/:id/comments', function (req, res) {
//     UserModel.findOne({'_id': req.params.id}).populate('comments').exec((err, user) => {
//         res.json(user.posts);
//     });

// });





module.exports = router;