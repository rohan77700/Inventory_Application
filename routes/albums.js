const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.list);
router.get('/create', albumController.createForm);
router.post('/create', albumController.create);
router.get('/:id', albumController.detail);
router.get('/:id/edit', albumController.editForm);
router.post('/:id/edit', albumController.update);
router.post('/:id/delete', albumController.delete);

module.exports = router;