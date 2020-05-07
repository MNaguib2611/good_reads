let Author = require('../models/author');

exports.getAllAuthors = (req, res) => {
    Author.find()
        .select('name bio dateOfBirth photo books')
        .then(authors => res.status(200).json(authors))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.addAuthor = (req, res, cb) => {
    // console.log(req.file);
    const name = req.body.name;
    const bio = req.body.bio;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const photo = req.file.path
    const books = req.body.books

    // if (name != -1){
    //     cb(new Error('author with same name already exist'),false)
    // }

    const newAuthor = new Author({name, bio, dateOfBirth, photo, books})

    newAuthor.save()
        .then(() => res.status(201).json('Author has been created successfully!'))
        .catch(() => res.status(400).send({
            "errors": {
                "name": {
                    "message": "Your name cannot be blank."
                }
            }
        }))
}

exports.getAuthorById = (req, res) => {
    Author.findById(req.params.id)
        .then(author => res.status(200).json(author))
        .catch((err) => res.status(400).json({ "error": { "message": "sorry, author id couldn't be found" } }))
}

exports.deleteAuthor = (req, res) => {
    Author.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('Author has been deleted successfully'))
        .catch(err => res.status(400).json({ "error": { "message": "sorry, author id couldn't be found" } }))
}

exports.editAuthor = (req, res, cb) => {
    Author.findById(req.params.id)
        .then(author => {
            author.name = req.body.name
            author.bio = req.body.bio
            author.dateOfBirth = Date.parse(req.body.dateOfBirth)
            // author.photo = req.file.path

            // if (author.name != -1) {
            //     cb({"error": { "errmsg": "name already exist" }}, false)
            // }

            author.save()
                .then(() => res.status(200).json('author has been updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}