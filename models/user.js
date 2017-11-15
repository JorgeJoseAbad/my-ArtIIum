const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isArtist: {
    type: Boolean,
    required: false,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  pic_path: {
    type: String,
    default: "../images/user_color.png"
  },
  dateRegister: Date, //deberá hacerlo el sistema
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
