var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/*añado cosas para comentar*/


const express  = require('express');
const Artwork = require('../models/artwork');
const TYPES    = require('../models/artwork-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const {authorizeArtwork, checkOwnership} = require('../middleware/artwork-authorization');

router.get('/new', (req, res) => {
  res.render('gallery/new', { types: TYPES });
});
