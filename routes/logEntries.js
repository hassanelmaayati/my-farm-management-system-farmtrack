const express = require('express');
const router = express.Router({ mergeParams: true });
const isSignedIn = require('../middleware/isSignedIn.js');
const logEntriesController = require('../controllers/logEntries.js');

router.use(isSignedIn);

router.post('/', logEntriesController.create);
router.get('/new', logEntriesController.renderNewForm);
router.get('/:id/edit', logEntriesController.renderEditForm);
router.put('/:id', logEntriesController.update);
router.delete('/:id', logEntriesController.destroy);

module.exports = router;