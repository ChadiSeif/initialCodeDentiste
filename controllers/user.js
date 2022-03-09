const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      consulting,
      email,
      password,
    } = req.body;

    ///check email

    const usertoFind = await User.findOne({ email });
    if (usertoFind) {
      return res.status(400).send({
        errors: [
          {
            msg: "Utilisateur deja inscrit ! merci de vous connecter pour la prise de rendez-vous",
          },
        ],
      });
    }
    const newuser = new User({
      firstName,
      lastName,
      phone,
      dateOfBirth,
      consulting,
      email,
      password,
    });

    // hashing the password
    const salt = 10;
    const hashedpassword = await bcrypt.hash(password, salt);
    newuser.password = hashedpassword;

    //Generate Token
    await newuser.save();
    const token = jwt.sign({ id: newuser._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    res
      .status(200)
      .send({ msg: "utilisateur est bien enregistré", newuser, token });
  } catch (error) {
    return res.status(400).send({
      errors: [{ msg: " Prise de rendez vous non effectuée !" }],
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    ///test email
    const userToFind = await User.findOne({ email });
    if (!userToFind) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Informations non valides" }] });
    }

    //Create token
    const token = jwt.sign({ id: userToFind._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    // verif password
    const isMatch = await bcrypt.compare(password, userToFind.password);
    if (isMatch) {
      return res.status(200).send({ msg: "Succes", userToFind, token });
    } else {
      return res
        .status(400)
        .send({ errors: [{ msg: "Informations non valides" }] });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ errors: [{ msg: "erreur d'authentification" }] });
  }
};

exports.current = (req, res) => {
  res.send(req.user);
};

exports.updateUser = userid = async (req, res) => {
  try {
    const userid = req.params.id;
    const userupdated = req.body;
    // const salt = 10;
    // const hashedpassword = bcrypt.hash(userupdated.password, salt);
    // userupdated.password = hashedpassword;
    const result = await User.updateOne(
      { _id: userid },
      { $set: { ...userupdated } }
    );
    return res
      .status(200)
      .send({ msg: "Vos informations sont bien modifiées", result });
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: "update failed..." }] });
  }
};

exports.deleteUser = userid = async (req, res) => {
  try {
    const userid = req.params.id;
    await User.deleteOne({ _id: userid });
    return res.status(200).send({ msg: "Compte supprimé !" });
  } catch (error) {
    return res.status(401).send({ msg: "Compte ne peut pas etre supprimé " });
  }
};
