const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  image: String, // Cloudinary image URL
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
