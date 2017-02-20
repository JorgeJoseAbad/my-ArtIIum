const express = require('express');
const Artwork = require('../models/artwork');
const TYPES = require('../models/artwork-types');
const router = express.Router();
const multer = require('multer');
// var upload = multer({
//   dest: './public/uploads/'
// });
const {
  ensureLoggedIn
} = require('connect-ensure-login');
const {
  authorizeArtwork,
  checkOwnership
} = require('../middleware/artwork-authorization');


router.get('/new', (req, res) => {
  res.render('gallery/new', {
    types: TYPES
  });
});

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newArtwork = new Artwork({
    title: req.body.title,
    startBid: req.body.startBid,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline,
    _creator: req.user._id,
    pic_path: req.body.pic_path,
    pic_name: req.body.pic_name
  });

  newArtwork.save((err) => {
    if (err) {
      res.render('gallery/new', {
        artwork: newArtwork,
        types: TYPES
      });
    } else {
      res.redirect(`/gallery/${newArtwork._id}`);
    }
  });
});

router.get('/:id', checkOwnership, (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    if (err) {
      return next(err);
    }
    artwork.populate('_creator', (err, artwork) => {
      if (err) {
        return next(err);
      }
      return res.render('gallery/show', {
        artwork
      });
    });
  });
});

router.get('/:id/edit', [ensureLoggedIn('/login'), authorizeArtwork], (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    if (err) {
      return next(err);
    }
    if (!artwork) {
      return next(new Error("404"));
    }
    return res.render('gallery/edit', {
      artwork,
      types: TYPES
    });
  });
});

router.post('/:id', [ensureLoggedIn('/login'), authorizeArtwork], (req, res, next) => {
  const updates = {
    title: req.body.title,
    startBid: req.body.startBid,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline,
    pic_path: req.body.pic_path,
    pic_name: req.body.pic_name
  };
  Artwork.findByIdAndUpdate(req.params.id, updates, (err, artwork) => {
    if (err) {
      return res.render('gallery/edit', {
        artwork,
        errors: artwork.errors
      });
    }
    if (!artwork) {
      return next(new Error("404"));
    }
    return res.redirect(`/gallery/${artwork._id}`);
  });
});

module.exports = router;
