module.exports = async (req, res, next) => {
  let userValid = true;
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
};
