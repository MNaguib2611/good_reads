let Author = require('../models/author');

// const search = async (req, res) => {
//     const q = req.query.q || ""
//     const authors = await Author.find({name: {$regex: q,$options: "i"}},'name bio dateOfBirth photo books')
//     res.status(200).send(authors)
// }

exports.getAllAuthors = (req, res) => {
    Author.find()
        .select('name bio dateOfBirth photo books')
        .then(authors => res.status(200).json(authors))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.addAuthor = (req, res) => {
    console.log(req.file);
    const name = req.body.name;
    const bio = req.body.bio;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const photo = req.file.path
    const books = req.body.books

    const newAuthor = new Author({name, bio, dateOfBirth, photo, books})

    newAuthor.save()
        .then(() => res.status(201).json('Author has been created successfully!'))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.getAuthorById = (req, res) => {
    Author.findById(req.params.id)
        .then( author => res.status(200).json(author))
        .catch(err => res.status(400).json('Error: ' + err ))
}

exports.deleteAuthor = (req, res) => {
    Author.findByIdAndDelete(req.params.id)
        .then( () => res.status(200).json('Author has been deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err ))
}

exports.editAuthor = (req, res) => {
    Author.findById(req.params.id)
        .then( author => {
            author.name = req.body.name
            author.bio = req.body.bio
            author.dateOfBirth = Date.parse(req.body.dateOfBirth)
            author.photo = (req.body.photo)

            author.save()
                .then( () => res.status(200).json('author has been updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err ))
        })
        .catch(err => res.status(400).json('Error: ' + err ))
}

// module.exports={
//     // search,
//
// }