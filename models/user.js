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
    default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  },
  dateRegister: Date, //deberá hacerlo el sistema
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
