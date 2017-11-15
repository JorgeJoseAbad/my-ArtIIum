const express = require('express');
const router = express.Router();
//const Artwork = require('../models/artwork');
const passport = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

console.log("in authentication.js");

/*
router.get('/', (req, res, next) => {
  Artwork
    .find({})
    .populate('_creator')
    .exec((err, gallery) => {
      res.render('index', {
        gallery,
        req
      });
    });
});
*/
router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', {
    req
  });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', {
    req
  });
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup'
}));

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
