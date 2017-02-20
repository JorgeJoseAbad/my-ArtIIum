const express = require('express');
const router = express.Router();
const Artwork = require('../models/artwork');

/* GET home page. */
router.get('/', (req, res, next) => {
  Artwork
    .find({})
    .populate('_creator')
    .exec((err, gallery) => {
      res.render('index', {
        gallery
      });
    });

});
module.exports = router;
