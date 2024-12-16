const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');
const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllUsers);
router.delete('/:userId', isAdmin, deleteUser);

module.exports = router;