const express = require('express');
const router = express.Router();
const personController = require('../controllers/personContact.controller');

router.get('/', personController.get);
router.get('/:id', personController.getDataById);
router.post('/', personController.create);
router.put('/:id', personController.update);
router.delete('/:id', personController.delete);

module.exports = router;