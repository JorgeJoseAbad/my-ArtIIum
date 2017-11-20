// routes/offers.js
const express                 = require('express');
const moment                  = require('moment');
const Artwork                = require('../models/artwork');
const Offer                  = require('../models/offer');
const { authorizeArtwork }   = require('../middleware/artwork-authorization');
const router                  = express.Router();
const ObjectId                = require('mongoose').Types.ObjectId;





router.get('/gallery/:id/offers', (req, res, next) => {
  Artwork
    .findById(req.params.id)
    .populate('offers')
    .exec(   (err, artwork) => {
      if (err || !artwork){ return next(new Error("404")); }
      res.render('offers/index', { artwork });
    });
});



// routes/offers.js
router.get('/gallery/:id/offers/new', authorizeArtwork, (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    res.render('offers/new', { artwork });
  });
});



router.post('/gallery/:id/offers', authorizeArtwork, (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    if (err || !artwork) { return next(new Error("404")); }

    const offer = new Offer({
        artist_id: req.body.artist_id,
        buyer_id: req.body.buyer_id,
        artworkTittle: req.body.artworkTittle,
        price: req.body.price,
        offerState: req.body.offerState
    });

    offer.save( (err) => {
      if (err){
        return res.render('offers/new', { errors: offers.errors });
      }

      artwork.offers.push(offer._id);
      artwork.save( (err) => {
        if (err) {
          return next(err);
        } else {
          return res.redirect(`/gallery/${artwork._id}`);
        }
      });
    });
  });
});



module.exports = router;
