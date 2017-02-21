// routes/offers.js
const express                 = require('express');
const moment                  = require('moment');
const Artwork                = require('../models/artwork');
const Offer                  = require('../models/offer');
const { authorizeArtwork }   = require('../middleware/artwork-authorization');
const router                  = express.Router();
const ObjectId                = require('mongoose').Types.ObjectId;

/* original modelo
router.get('/campaigns/:id/rewards', (req, res, next) => {
  Campaign
    .findById(req.params.id)
    .populate('rewards')
    .exec(   (err, campaign) => {
      if (err || !campaign){ return next(new Error("404")); }
      res.render('rewards/index', { campaign });
    });
});
*/

router.get('/gallery/:id/offers', (req, res, next) => {
  Artwork
    .findById(req.params.id)
    .populate('offers')
    .exec(   (err, artwork) => {
      if (err || !artwork){ return next(new Error("404")); }
      res.render('offers/index', { artwork });
    });
});




// routes/rewards.js lo de modelo
/*router.get('/campaigns/:id/rewards/new', authorizeCampaign, (req, res, next) => {
  Campaign.findById(req.params.id, (err, campaign) => {
    res.render('rewards/new', { campaign });
  });
});
*/

// routes/offers.js
router.get('/gallery/:id/offers/new', authorizeArtwork, (req, res, next) => {
  Artwork.findById(req.params.id, (err, artwork) => {
    res.render('offers/new', { artwork });
  });
});

/*
router.post('/campaigns/:id/rewards', authorizeCampaign, (req, res, next) => {
  Campaign.findById(req.params.id, (err, campaign) => {
    if (err || !campaign) { return next(new Error("404")); }

    const reward = new Reward({
      title      : req.body.title,
      description: req.body.description,
      amount     : req.body.amount,
      delivery   : req.body.delivery,
      _campaign  : campaign._id
    });

    reward.save( (err) => {
      if (err){
        return res.render('rewards/new', { errors: reward.errors });
      }

      campaign.rewards.push(reward._id);
      campaign.save( (err) => {
        if (err) {
          return next(err);
        } else {
          return res.redirect(`/campaigns/${campaign._id}`);
        }
      });
    });
  });
});
*/

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
