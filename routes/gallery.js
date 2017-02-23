const express = require('express');
const Artwork = require('../models/artwork');
const TYPES = require('../models/artwork-types');
const router = express.Router();
const multer = require('multer');
let upload = multer({
  dest: './public/uploads/'
});
const {
  ensureLoggedIn
} = require('connect-ensure-login');
const {
  authorizeArtwork,
  checkOwnership
} = require('../middleware/artwork-authorization');

router.get('/new', (req, res) => {
  res.render('gallery/new', {
    types: TYPES,
    req
  });
});

router.post('/upload', ensureLoggedIn('/login'), upload.single('artworkImage'), (req, res) => {
  pic_path = "/uploads/" + req.file.filename;
  userId = req.body._id;
  Artwork.findByIdAndUpdate(userId, {
    pic_path
  }, (err, image) => {
    if (err) {
      return next(err);
    }
    return res.redirect(`/gallery/${req.body._id}`);
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
    // pic_name: req.body.pic_name
  });

  newArtwork.save((err, artwork) => {
    if (err) {
      res.render('gallery/new', {
        err,
        artwork: newArtwork,
        types: TYPES,
        req
      });
    } else {
      res.redirect(`/gallery/${newArtwork._id}`);
    }
  });
});

router.get('/:id', ensureLoggedIn('/login'), checkOwnership, (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    if (err) {
      return next(err);
    }
    artwork.populate('_creator', (err, artwork) => {
      if (err) {
        return next(err);
      }
      return res.render('gallery/show', {
        artwork,
        req
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
      types: TYPES,
      req
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

/*added to delete artwork*/
/*get to delete view*/
router.get('/:id/delete', [ensureLoggedIn('/login'), authorizeArtwork], (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    if (err) {
      console.log("ERROR tras primer if");
      return next(err);
    }
    if (!artwork) {
      console.log("error tras segundo if");
      return next(new Error("404"));
    }
    console.log("busca renderizar gallery/delete");
    return res.render('gallery/delete', {
      artwork,
      types: TYPES,
      req
    });
  });
});

/* post to delete*/
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Artwork.findByIdAndRemove(id, (err, product) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/user');
  });
});
/*upper added to delete artwork*/

/*get to buy page*/
router.get('/:id/buy', ensureLoggedIn('/login'), (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    if (err) {
      return next(err);
    }
    if (!artwork) {
      return next(new Error("404"));
    }
    return res.render('gallery/buy', {
      artwork,
      types: TYPES,
      req
    });
  });
});

module.exports = router;
