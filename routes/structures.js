const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn.js');
const structuresController = require('../controllers/structures.js');

router.use(isSignedIn);

router.get('/', structuresController.index);
router.get('/new', structuresController.renderNewForm);
router.post('/', structuresController.create);
router.get('/:id', structuresController.show);
router.get('/:id/edit', structuresController.renderEditForm);
router.put('/:id', structuresController.update);
router.delete('/:id', structuresController.destroy);

module.exports = router;