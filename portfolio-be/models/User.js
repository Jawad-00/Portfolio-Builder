const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  bio: String,
  skills: [String],
  profileImage: String, // Cloudinary image URL
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
