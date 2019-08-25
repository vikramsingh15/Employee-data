const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  age: String,
  location: String,
  image: {
    public_id: String,
    secure_url: { type: String, default: '/img/default-profile.jpg' }
  },
  status: { type: String, required: true },
  phone: String,
  email: String,
  skills: [String],
  bio: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('employee', employeeSchema);
