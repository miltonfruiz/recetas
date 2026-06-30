const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const authenticate = require('../middleware/auth');

router.get('/api/recipes', authenticate, controller.getAll);
router.post('/api/recipes', authenticate, controller.createOne);
router.get('/api/recipes/:id', authenticate, controller.getOne);
router.put('/api/recipes/:id', authenticate, controller.updateOne);
router.delete('/api/recipes/:id', authenticate, controller.deleteOne);

module.exports = router;