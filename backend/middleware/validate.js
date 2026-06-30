const { body, validationResult } = require('express-validator');

const validationRules = [
  body('username').trim().not().isEmpty().withMessage('Username is required'),
  body('password').trim().not().isEmpty().withMessage('Password is required'),
  body('email').trim().isEmail().withMessage('Invalid email format')
];

const validate = (req, res, next) => {
  validationRules.forEach(rule => rule.run(req));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;