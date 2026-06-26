const { body, validationResult } = require('express-validator');

const rules = [
  body('name')
    .exists()
    .withMessage('Le nom est requis')
    .isString()
    .isLength({ min: 3, max: 40 })
    .withMessage('Le nom doit contenir entre 3 et 40 caractères'),
  body('quantity')
    .exists()
    .withMessage('La quantité est requise')
    .isInt({ min: 0 })
    .withMessage('La quantité doit être un entier supérieur ou égal à 0'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = [...rules, validate];
