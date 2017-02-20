const Artwork = require('../models/artwork.js');

function authorizeArtwork(req, res, next) {
  Artwork.findById(req.params.id, (err, artwork) => {
    // If there's an error, forward it
    if (err) {
      return next(err);
    }
    // If there is no campaign, return a 404
    if (!artwork) {
      return next(new Error('404'));
    }
    // If the campaign belongs to the user, next()
    if (artwork.belongsTo(req.user)) {
      return next();
    } else {
      // Otherwise, redirect
      return res.redirect(`/gallery/${artwork._id}`);
    }
  });
}

function checkOwnership(req, res, next) {
  Artwork.findById(req.params.id, (err, artwork) => {
    if (err) {
      return next(err);
    }
    if (!artwork) {
      return next(new Error('404'));
    }

    if (artwork.belongsTo(req.user)) {
      res.locals.artworkIsCurrentUsers = true;
    } else {
      res.locals.artworkIsCurrentUsers = false;
    }
    return next();
  });
}

module.exports = {
  authorizeArtwork,
  checkOwnership
};
