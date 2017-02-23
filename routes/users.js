const express = require('express');
const Artwork = require('../models/artwork');
const User = require('../models/user');
const TYPES = require('../models/artwork-types');
const router = express.Router();
const multer = require('multer');
let upload = multer({
  dest: './public/uploads/'
});
const {
  ensureLoggedIn
} = require('connect-ensure-login');
// const {
//   authorizeArtwork,
//   checkOwnership
// } = require('../middleware/artwork-authorization');

/* GET users listing. */
router.get('/:username', ensureLoggedIn('/login'), (req, res, next) => {
  User.findOne({
    username: req.params.username
  }, (err, user) => {
    if (err) return next(err);
    return res.render('users/user', {
      user,
      req
    });
  });
});

router.post('/upload', ensureLoggedIn('/login'), upload.single('profileImage'), (req, res) => {
  pic_path = "uploads/" + req.file.filename;
  userId = req.user._id;
  User.findByIdAndUpdate(userId, {
    pic_path
  }, (err, image) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/user');
  });

});

router.get('/edit/:username', ensureLoggedIn('/login'), (req, res, next) => {
  User.findOne({
    username: req.params.username
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error("404"));
    }
    return res.render('users/edit', {
      user,
      types: TYPES,
      req
    });
  });
});

router.post('/edit/:username', ensureLoggedIn('/login'), (req, res, next) => {
  const updates = {
    username: req.body.username,
    email: req.body.email,
    description: req.body.description,
    isArtist: req.body.isArtist,
    pic_path: req.body.pic_path,
  };
  User.findOneAndUpdate(req.params.username, updates, (err, user) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/user");
  });
});

module.exports = router;

/*añado cosas para comentar*/
