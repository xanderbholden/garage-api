const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login-failed'
  }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'You are not logged in'
    });
  }

  res.json({
    message: 'Login successful',
    user: req.user.displayName || req.user.username
  });
});

router.get('/login-failed', (req, res) => {
  res.status(401).json({
    message: 'Login failed'
  });
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.json({
      message: 'Logout successful'
    });
  });
});

module.exports = router;