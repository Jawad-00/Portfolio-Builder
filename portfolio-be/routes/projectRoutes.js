const express = require('express');
const upload = require('../middleware/upload');
const { createProject, getUserProjects } = require('../controllers/projectController');

const router = express.Router();

router.post('/', upload.single('image'), createProject);
router.get('/:userId', getUserProjects);

module.exports = router;
