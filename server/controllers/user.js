const {UserModel} = require('../models/allModels');
const bcrypt = require('bcrypt');



const getAllUsers    = function (req, res) {
    UserModel.find({"isAdmin":false}, function (err, users) {
        res.json(users);
    });
}
const getOneUser    =  function (req, res) {
    UserModel.find({
        "isAdmin":false,
        '_id': req.params.id
    }).exec((err, user) => {
        res.json(user);
    });

}
const updateProfile    =async function (req, res) {
    //check if users is only updating themselves
    if (req.params.id!=req.user._id) {
        res.status(403).json({"message":"action not permitted"})
    }
    const {
        body: {
            firstName,
            lastName,
            image,
        }
    } = req;
    UserModel.findByIdAndUpdate(
        { _id: req.user._id},
        {
            firstName,
            lastName,
            image,
        },
         function(err, result){

        if(err){
            console.log(err);
            res.status(424).json({"message":"something went wrong"});
        }
        else{
            res.status(200).json({"message":"Account has been updated successfully"});
        }

    })
}
const passwordUpdate    =  async function (req, res) {
    const {
        body: {
            password,
            newPassword
        }
    } = req;

    if ( await bcrypt.compare(password,req.user.password)) {
        console.log("asdsadsad");
        
        UserModel.findByIdAndUpdate(
            { _id: req.user._id },
            {
                "password":await bcrypt.hash(newPassword, 8)
            },
             function(err, result){
    
            if(err){
                console.log(err);
                res.status(424).json({"message":"something went wrong"});
            }
            else{
                res.status(200).json({"message":"Password has been updated successfully"});
            }
    
        })
    }else{
        res.status(424).json({"message":"wrong password"});
    }
}






module.exports = {
    getAllUsers,
    getOneUser,
    updateProfile,
    passwordUpdate,
}