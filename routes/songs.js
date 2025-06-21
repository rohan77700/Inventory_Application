const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/', songController.list);
router.get('/create', songController.createForm);
router.post('/create', songController.create);
router.get('/:id', songController.detail);
router.get('/:id/edit', songController.editForm);
router.post('/:id/edit', songController.update);
router.post('/:id/delete', songController.delete);

module.exports = router;