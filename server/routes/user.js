const express = require('express');
const UserModel = require('./models/users.js');


const bcrypt = require('bcrypt');
const router = express.Router();


router.get('/', function (req, res) {
    UserModel.find({}, function (err, users) {
        let userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        res.json(userMap);
    });
});

router.post('/', function (req, res) {
    const {
        body: {
            firstName,
            lastName,
            email,
            password
        }
    } = req;
    // let password = bcrypt.hashSync(password, 10);
    const user = new UserModel({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10)
    });
    user.save(function (err) {
        if (!err) res.send("<h1>User stored Successfully</h1>");
        else console.log(err);
    });
});


router.get('/:id', function (req, res) {
    UserModel.find({
        '_id': req.params.id
    }).populate('posts').exec((err, user) => {
        res.json(user);
    });

});

router.patch('/:id', async function (req, res) {
    const {
        body: {
            firstName,
            lastName,
            email,
            password
        }
    } = req;
    let conditions = {
            '_id': req.params.id
        },
        update = {
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10)
        },
        options = {
            multi: true
        };
    UserModel.update(conditions, update, options, callback);

    function callback(err, numAffected) {
        UserModel.findOne({
            'email': req.params.email
        }, function (err, user) {
            res.send(user);
        });
    }
});


router.delete('/:id', function (req, res) {


    UserModel.deleteOne({
        '_id': req.params.id
    }, callback);

    function callback(err) {
        if (err) console.log(err);
        console.log("user Deleted Successfully");
        UserModel.find({}, function (err, users) {
            let userMap = {};
            users.forEach(function (user) {
                userMap[user._id] = user;
            });
            res.json(userMap);
        });
    }
});

router.get('/:id/posts', function (req, res) {

    UserModel.findOne({'_id': req.params.id}).populate('posts').exec((err, user) => {
        res.json(user.posts);
    });

    // PostModel.find({
    //   'author': req.params.id
    // }).exec((err, posts) => {
    //   res.json(posts);
    // });

});



module.exports = router;