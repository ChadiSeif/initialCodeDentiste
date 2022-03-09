const Medecin = require("../models/Medecin");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.registermedecin = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      dateOfBirth,
      email,
      speciality,
      address,
      city,
      password,
    } = req.body;

    // check email
    const doctortofind = await Medecin.findOne({ email });
    if (doctortofind) {
      return res.status(400).send({
        errors: [
          {
            msg: "Medecin deja inscrit ! merci de vous connecter pour gèrer vos rendez-vous",
          },
        ],
      });
    }
    const newdoctor = new Medecin({
      firstname,
      lastname,
      phone,
      dateOfBirth,
      email,
      speciality,
      address,
      city,
      password,
    });

    ///hash password

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    newdoctor.password = hashedPassword;
    await newdoctor.save();

    // //Generate Token

    const token = jwt.sign({ id: newdoctor._id }, process.env.SECRET_KEY);
    return res
      .status(200)
      .send({ msg: "Docteur vous etes bien enregistré", newdoctor, token });
  } catch (error) {
    return res
      .status(401)
      .send({ errors: [{ msg: "Docteur non enregistré " }] });
  }
};

exports.loginmedecin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check email
    const doctorfound = await Medecin.findOne({ email });
    if (!doctorfound) {
      res
        .status(401)
        .send({ errors: [{ msg: "il n'y a pas de Docteur avec cet email" }] });
    }

    //token
    const token = jwt.sign({ id: doctorfound._id }, process.env.SECRET_KEY);

    const isMatch = await bcrypt.compare(password, doctorfound.password);
    if (!isMatch) {
      res.status(401).send({ errors: [{ msg: "Informations non valides" }] });
    } else {
      res.status(200).send({ msg: "Succes", doctorfound, token });
    }
  } catch (error) {
    res
      .status(401)
      .send({ errors: [{ msg: "erreur aucours de l'authentification" }] });
  }
};

exports.currentMedecin = (req, res) => {
  res.send(req.user);
};

exports.getlist = async (req, res) => {
  try {
    const medecins = await Medecin.find();
    return res.status(200).send({ msg: "liste des médecins", medecins });
  } catch (error) {
    return res
      .status(401)
      .send({ errors: [{ msg: "liste des médecins n'est pas disponible" }] });
  }
};

exports.getOneDoctor = async (req, res) => {
  try {
    const doctortofind = req.params.id;
    const doctorfound = await Medecin.findOne({ _id: doctortofind });
    return res
      .status(200)
      .send({ msg: "here is the doctor you want", doctorfound });
  } catch (error) {
    return res
      .status(401)
      .send({ errors: [{ msg: "Ce docteur n'existe pas" }] });
  }
};

exports.updateDoctor = doctorid = async (req, res) => {
  try {
    const doctorid = req.params.id;
    const doctorupdated = req.body;
    const result = await Medecin.updateOne(
      { _id: doctorid },
      { $set: { ...doctorupdated } }
    );
    return res.status(200).send({ msg: "Vos informations sont bien modifiés" });
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: "update failed..." }] });
  }
};

exports.deleteDoctor = doctorid = async (req, res) => {
  try {
    const doctorid = req.params.id;
    await Medecin.deleteOne({ _id: doctorid });
    return res.status(200).send({ msg: "Compte supprimé !" });
  } catch (error) {
    return res.status(401).send({ msg: "Compte ne peut pas etre supprimé " });
  }
};
