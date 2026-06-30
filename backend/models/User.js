const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);