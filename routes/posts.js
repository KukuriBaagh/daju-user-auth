const router = require('express').Router();
const { publicPosts, privatePosts } = require('../db');

router.get('/public', (req, res) => {
  res.json(publicPosts);
});

router.get(
  '/private',
  (req, res, next) => {
    let userValid = false;
    if (userValid) {
      next();
    } else {
      return res.status(400).json({
        errors: [
          {
            msg: 'unauthorized request, please login',
          },
        ],
      });
    }
  },
  (req, res) => {
    res.json(privatePosts);
  }
);

module.exports = router;