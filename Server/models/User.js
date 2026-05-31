const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  telephone: {
    type: String,
    required: true,
    unique: true
  },

  dob: {
    type: String,
    default: ""
  },

  addresses: [
    {
      fullAddress: String,
      city: String,
      state: String,
      isDefault: Boolean
    }
  ],

  isPrime: {
    type: Boolean,
    default: false
  },

  primePlan: {
    type: String,
    default: null
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);