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
        res.status(201).json('Comment has been saved')
    } catch (error) {
        res.status(500).json('Error: ' + error)
    }
}

const getBookComments = async (req, res) => {
    try {
        const comments = await CommentModel.find({book: req.params.book}).populate({
            path: 'user', 
            select: 'username' 
        }).exec();
        
        if(!comments){
            res.status(404).send('not found');
        }
        res.status(200).json(comments)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const userComments = async (req, res)=>{
    // try {
    //     // console.log(req.params.user);
    //     const user = await User.findById(req.params.user);
    //     // console.log(user);
    //     await user.populate('comments').execPopulate();
    //     console.log(user.comment);
    //     if (!user.comment) {
    //         res.status(404).send('not found');
    //     }
    //     res.status(200).json(user.comment);
    // } catch (error) {
    //     res.status(500).json(error);
    // }
    CommentModel.find({user: req.params.user})
    .select('content')
    .then(comments=> {
        if (!comments) {
            res.status(404).send('not found');
        }
        res.status(200).json(comments);
    })
    .catch(err => res.status(500).json(error))
}

module.exports = {
    saveComment,
    userComments,
    getBookComments,
}