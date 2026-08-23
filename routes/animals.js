const express = require('express');
const router = express.Router({ mergeParams: true });
const isSignedIn = require('../middleware/isSignedIn.js');
const animalsController = require('../controllers/animals.js');

router.use(isSignedIn);

router.post('/', animalsController.create);
router.get('/new', animalsController.renderNewForm);
router.get('/:id', animalsController.show);
router.get('/:id/edit', animalsController.renderEditForm);
router.put('/:id', animalsController.update);
router.delete('/:id', animalsController.destroy);

module.exports = router;