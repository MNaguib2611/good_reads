const router = require('express').Router();
const commentController = require('../controllers/comment');

router.post('/', commentController.saveComment);

router.get('/:user', commentController.retrieveComments);

module.exports = router;