const router = require('express').Router();
let Author = require('../models/author');

router.route('/').get((req, res) => {
    Author.find()
        .then(authors => res.json(authors))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const dateofbirth = Date.parse(req.body.dateofbirth);
    const photo = req.body.photo
    // const books = req.body.books

    const newAuthor = new Author({firstName, lastName, dateofbirth, photo})

    newAuthor.save()
        .then(() => res.json('Author added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;
