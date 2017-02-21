const express = require('express');
const Artwork = require('../models/artwork');
const User = require('../models/user');
const TYPES = require('../models/artwork-types');
const router = express.Router();
const multer = require('multer');
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
      req
    });
  });
});

router.get('/:username/edit', ensureLoggedIn('/login'), (req, res, next) => {
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
      req,
      user
      // types: TYPES
    });
  });
});

router.post('/:username', ensureLoggedIn('/login'), (req, res, next) => {
  const updates = {
    username: req.body.username,
    email: req.body.email,
    description: req.body.description,
    isArtist: req.body.isArtist,
    pic_path: req.body.pic_path,
  };
  User.findOneAndUpdate(req.params.username, updates, (err, user) => {
    if (err) {
      return res.render('users/edit', {
        artwork,
        errors: user.errors
      });
    }
    if (!user) {
      return next(new Error("404"));
    }
    return res.redirect(`/users/${user._id}`);
  });
});

module.exports = router;

/*añado cosas para comentar*/
