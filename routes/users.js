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
router.get('/:username', (req, res, next) => {
  User.findOne({
    username: {
      $eq: ''
    }
  }, (err, user) => {
    if (err) return next(err);
    return res.render('users/user', {
      req: req
    });
  });
});

// router.get('/:id/edit', [ensureLoggedIn('/login'), authorizeArtwork], (req, res, next) => {
//   Artwork.findById(req.params.id, (err, artwork) => {
//     if (err) {
//       return next(err);
//     }
//     if (!artwork) {
//       return next(new Error("404"));
//     }
//     return res.render('gallery/edit', {
//       artwork,
//       types: TYPES
//     });
//   });
// });
//
// router.post('/:id', [ensureLoggedIn('/login'), authorizeArtwork], (req, res, next) => {
//   const updates = {
//     title: req.body.title,
//     startBid: req.body.startBid,
//     description: req.body.description,
//     category: req.body.category,
//     deadline: req.body.deadline,
//     pic_path: req.body.pic_path,
//     pic_name: req.body.pic_name
//   };
//   Artwork.findByIdAndUpdate(req.params.id, updates, (err, artwork) => {
//     if (err) {
//       return res.render('gallery/edit', {
//         artwork,
//         errors: artwork.errors
//       });
//     }
//     if (!artwork) {
//       return next(new Error("404"));
//     }
//     return res.redirect(`/gallery/${artwork._id}`);
//   });
// });

module.exports = router;

/*añado cosas para comentar*/
