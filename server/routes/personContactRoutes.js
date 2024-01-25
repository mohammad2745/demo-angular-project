const express = require('express');
const router = express.Router();
const personController = require('../controllers/personContact.controller');

router.get('/', personController.index);
router.get('/:id', personController.view);
router.post('/', personController.create);
router.post('/update/:id', personController.update);
router.get('/delete/:id', personController.delete);

module.exports = router;