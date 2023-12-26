const express = require('express');

const router = express.Router();

const expController = require('../controller/exp')

router.get('/', expController.getExp);

router.post('/add-exp', expController.addExp);

router.delete('/exp/:id', expController.delExp);

module.exports = router;