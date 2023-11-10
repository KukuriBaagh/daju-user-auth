const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { users } = require('../db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

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
  async (req, res) => {
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
      return res.status(400).json({
        errors: {
          msg: 'This user already exists',
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      email,
      password: hashedPassword,
    });

    // WARN: use env variables for SECRETS
    const token = await JWT.sign(
      {
        //payload
        email,
      },
      //secret-jwt
      'MYNAMEISANTHONYGONZALVIS',
      {
        // expiration time for token
        expiresIn: 3600000,
      }
    );

    res.json({
      token,
    });
  }
);

// LOGIN USER ROUTE

router.get('/login', async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  // check if user is valid
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: 'invalid credentials',
        },
      ],
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: 'invalid credentials',
        },
      ],
    });
  }
  const token = await JWT.sign(
    {
      //payload
      email,
    },
    //secret-jwt
    'MYNAMEISANTHONYGONZALVIS',
    {
      // expiration time for token
      expiresIn: 3600000,
    }
  );

  res.json({
    token,
  });
});

router.get('/all', (req, res) => {
  res.json(users);
});

module.exports = router;
