const express = require('express');
const {UserModel} = require('../models/allModels');
const {isAdmin, ensureAuthentication,isSuperAdmin} = require('../middlewares/auth.js');
const {adminController} = require('../controllers/allControllers')

const bcrypt = require('bcrypt');
const router = express.Router();



//get all admins
router.get('/admins', [ensureAuthentication, isAdmin],adminController.getAllAdmins);

//get admin by id
router.get('/admins/:id', [ensureAuthentication,isAdmin], adminController.getOneAdmin);


//get all endusers
router.get('/users', [ ensureAuthentication,isAdmin],adminController.getAllUsers);7


//get one enduser
router.get('/users/:id', [ensureAuthentication,isAdmin],adminController.getOneUser);

//this route will be accessible only by super admin
//this route will be used to add admins
router.post('/admins',[ensureAuthentication,isSuperAdmin], adminController.addNewAdmin);


//only superAdmin can reset admin passwords
router.patch('/admins/:id',[ensureAuthentication,isSuperAdmin], adminController.adminPassReset)


//update my password
router.patch('/password_update',[ensureAuthentication,isAdmin], adminController.adminPassUpdate)




//deleteing admin ->only superadmin
router.delete('/admins/:id',[ ensureAuthentication,isSuperAdmin], adminController.deleteAdmin);



//deleteing users 
router.delete('/users/:id',[ ensureAuthentication,isAdmin], adminController.deleteUser);



















module.exports = router;