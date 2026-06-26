const { body, validationResult } = require('express-validator');

const rules = [
  body('email')
    .exists()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email invalide"),
  body('password')
    .exists()
    .withMessage('Le mot de passe est requis')
    .isString()
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = [...rules, validate];
