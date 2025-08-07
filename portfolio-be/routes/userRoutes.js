const express = require('express');
const upload = require('../middleware/upload');
const { createUser, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', upload.single('profileImage'), createUser);
router.get('/:id', getUser);

module.exports = router;
