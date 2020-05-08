const express = require('express');
const router = express.Router();
const { bookController } = require('../controllers/allControllers');

router.get('/', (req, res) => {
    bookController.all(req, res);
});

router.post('/', (req, res) => {
    bookController.create(req, res);
});

module.exports = router;