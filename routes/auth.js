const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { users } = require('../db');

router.post(
  '/signup',
  [
    check('email', 'please provide a valid email').isEmail(),
    check(
      'password',
      'please provide a password that is greater than 6 chars'
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const { password, email } = req.body;

    // validated input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // validating if user doesn't already exists
    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      res.status(400).json({
        errors: {
          msg: 'This user already exists',
        },
      });
    }
    res.send('Validation past');
  }
);

module.exports = router;
