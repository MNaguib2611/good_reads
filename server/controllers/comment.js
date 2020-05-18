const CommentModel = require('../models/comment');
const User = require('../models/user');

const saveComment = async (req, res)=>{
    try {
        console.log(req.body);
        const content = req.body.content;
        const user = req.body.user;
        const book = req.body.book;
        const newComment = new CommentModel({content, user, book})
        await newComment.save()
        res.status(201).json('Category has been created!')
    } catch (error) {
        res.status(500).json('Error: ' + error)
    }
}

const retrieveComments = async (req, res)=>{
    try {
        const user = await User.findById(req.params.user);
        await user.populate('comments').execPopulate();
        // console.log(category.books);
        if (!comments) {
            res.status(404).send('not found');
        }
        res.status(200).json(user.comment);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    saveComment,
    retrieveComments,
}