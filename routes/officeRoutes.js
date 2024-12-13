const express = require('express');
const router = express.Router();
const officeController = require('../controllers/officeController');

router.get('/offices', officeController.getAllOffices);
router.post('/offices', officeController.createOffice);
router.put('/offices/:id', officeController.updateOffice);
router.delete('/offices/:id', officeController.deleteOffice);

module.exports = router;
