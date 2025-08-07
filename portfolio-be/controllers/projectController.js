const Project = require('../models/Project');
const cloudinary = require('../utils/cloudinary');

exports.createProject = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
        if (error) return res.status(500).json({ message: "Upload failed", error });

        const project = await Project.create({
          userId,
          title,
          description,
          image: result.secure_url
        });

        res.status(201).json(project);
      });

      req.pipe(result);
    } else {
      const project = await Project.create({
        userId,
        title,
        description,
        image: imageUrl
      });

      res.status(201).json(project);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Projects not found' });
  }
};
