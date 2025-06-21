const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/', artistController.list);
router.get('/create', artistController.createForm);
router.post('/create', artistController.create);
router.get('/:id', artistController.detail);
router.get('/:id/edit', artistController.editForm);
router.post('/:id/edit', artistController.update);
router.post('/:id/delete', artistController.delete);

module.exports = router;