const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');

exports.createUser = async (req, res) => {
  try {
    const { name, bio, skills } = req.body;
    let profileImage = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
        if (error) return res.status(500).json({ message: "Upload failed", error });

        const user = await User.create({
          name,
          bio,
          skills: skills.split(','),
          profileImage: result.secure_url
        });

        res.status(201).json(user);
      });

      req.pipe(result);
    } else {
      const user = await User.create({
        name,
        bio,
        skills: skills.split(','),
        profileImage
      });

      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
};
