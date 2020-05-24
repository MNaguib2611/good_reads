const fs = require('fs');
const Author = require('../models/author');
const Book = require('../models/Book');

// Search for author
const search = async (req, res) => {
    const q = req.query.q || ""
    try {
        const authors = await Author.find({name: {$regex: q, $options: "i"}}, 'name bio dateOfBirth photo books')
        if (authors.length === 0) {
            return res.status(404).end()
        }
        res.status(200).send(authors)

    } catch (e) {
        res.status(404).end()
    }
}

// Retrieve all authors
const getAllAuthors = (req, res) => {
    Author.find({})
        .select('name bio dateOfBirth image books')
        .then(authors => res.status(200).json({"data": authors}))
        .catch(err => res.status(400).json({"error": err}))
}

// Create new author
const addAuthor = (req, res) => {
    const path = req.file.path.substring(6);
    const author = new Author({
        ...req.body,
        image: req.file && path
    });
    author.save()
        .then(() => res.status(200).json({"data": author}))
        .catch((err) => res.status(400).json({"error": err}))
};

//find author bt Id
const getAuthorById = (req, res) => {
    Author.findById(req.params.id)
        .then(author => res.status(200).json({"data": author}))
        .catch(() => res.status(400).json({"error": {"message": "sorry, author id was not found"}}))
};

// Delete author
const deleteAuthor = (req, res) => {
    const authorId = req.params.id;

    Author.findByIdAndDelete(authorId).then((author) => {
        fs.unlinkSync(author.image);
        res.status(200).json({"data": author});
    }).catch((err) => {
        res.status(400).json({"error": err});
    })
};

// Update existing author
const updateAuthor = (req, res) => {
    const authorId = req.params.id;

    Author.findOneAndUpdate({_id: authorId}, {
        ...req.body,
        image: req.file.path
    }).then((author) => {
        // if a new image is added remove old one
        if (req.file) {
            fs.unlinkSync(author.image);
        }
        res.status(200).json({"data": author});
    }).catch((err) => {
        res.status(400).json({"error": err});
    })
};

//get popular author
// const popularAuthor = (req, res) => {
//     // Retrieve books sorted by popularity and limited to 9
//     Book.find({}, null, {sort: {popularity: -1}, limit: 9}).populate('book').populate('category').then((books) => {
//         // Declare a new array
//         const author_filtered = [];
//         // Declare an empty object
//         const uniqueAuthor = {};
//         // Loop for the array elements
//         for (let i in books) {
//             // Extract the author
//             const objAuthor = books[i]['author'];
//             // Use the title as the index
//             uniqueAuthor[objAuthor] = books[i];
//         }
//         // Loop to push unique object into array
//         for (i in uniqueAuthor) {
//             author_filtered.push(uniqueAuthor[i]);
//         }
//         res.status(200).json({"data": author_filtered});
//     }).catch((err) => {
//         res.status(500).json({"error": err});
//     });
// };



//Happy eid from Naguib
const popularAuthor = (req, res) => {
    // Retrieve books sorted by popularity and limited to 9
    Author.find({}, null, {sort: {popularity: -1}, limit: 5}).then((authors) => {
        res.status(200).json(authors);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
};






module.exports = {
    search,
    getAllAuthors,
    getAuthorById,
    deleteAuthor,
    updateAuthor,
    addAuthor,
    popularAuthor,
}