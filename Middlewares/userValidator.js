const { body, validationResult } = require("express-validator");

exports.validregister = () => [
  body("lastName", "Merci d'ajouter votre nom").notEmpty(),
  body("firstName", "Merci d'ajouter votre prénom").notEmpty(),
  body("phone", "Merci de corriger votre numero").isLength({ min: 8, max: 8 }),
  body("phone", "Merci d'ajouter votre numero").notEmpty(),
  body("dateOfBirth", "Merci d'ajouter votre date de naissance").notEmpty(),
  body("email", "Merci de corriger votre email").isEmail(),
  body("password", "Merci d'ajouter votre mot de passe").isLength({ min: 3 }),
];

exports.validlogin = () => [
  body("email", "Merci d'entrer votre email").isEmail(),
  body("password", "Merci d'entrer votre mot de passe").isLength({ min: 3 }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
