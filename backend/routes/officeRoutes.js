const express = require('express');
const router = express.Router();
const officeController = require('../controllers/officeController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', officeController.getAllOffices);
router.post('/', authenticateToken, officeController.createOffice);
router.put('/:id', authenticateToken, officeController.updateOffice);
router.delete('/:id', authenticateToken, officeController.deleteOffice);

module.exports = router;
