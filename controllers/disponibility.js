const Disponibility = require("../models/Disponibility");

exports.Create = async (req, res) => {
  try {
    const { medecinid } = req.body;
    const disponibility = new Disponibility({
      medecinid,
    });
    await disponibility.save();
    res
      .status(200)
      .send({ msg: "disponibilité crée avec succes", disponibility });
  } catch (error) {
    res.status(400).send({ msg: "disponibilité n'est pas crée", error });
  }
};

exports.MedecinDispo = async (req, res) => {
  try {
    const medecinidtofind = req.params.id;
    const disponibiliteMedecin = await Disponibility.find({
      medecinid: medecinidtofind,
    });
    res.status(200).send({
      msg: "disponibilité pour ce medecin est :",
      disponibiliteMedecin,
    });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "erreur lors de l'importation de la disponibilité", error });
  }
};

exports.listedisponibility = async (req, res) => {
  try {
    const listedispo = await Disponibility.find();
    res.status(200).send({
      msg: "liste des disponibilités est ",
      listedispo,
    });
  } catch (error) {
    res.status(400).send({ msg: "erreur lors de l'importation ", error });
  }
};

exports.updateDisponibility = async (req, res) => {
  try {
    const medecinid = req.params.id;
    const dispoUpdated = req.body;
    await Disponibility.updateOne(
      {
        medecinid: medecinid,
      },
      { $set: { ...dispoUpdated } }
    );
    const disponibility = await Disponibility.find({ medecinid: medecinid });
    return res
      .status(200)
      .send({ msg: "disponibilité modifié", disponibility });
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "erreur lors de la modification ", error });
  }
};

exports.updateDisponibilityDay = async (req, res) => {
  try {
    const medecinid = req.params.id;
    const { Day, Status, StartM, EndM, StartAN, EndAN } = req.body;
    await Disponibility.updateOne(
      {
        medecinid: medecinid,
        "Days.Day": Day,
      },
      {
        $set: {
          "Days.$.Status": Status,
          "Days.$.StartM": StartM,
        },
      }
    );
    await Disponibility.updateOne(
      {
        medecinid: medecinid,
        "Days.Day": Day,
      },
      {
        $set: {
          "Days.$.EndM": EndM,
          "Days.$.StartAN": StartAN,
          "Days.$.EndAN": EndAN,
        },
      }
    );
    const disponibility = await Disponibility.find({ medecinid: medecinid });
    return res
      .status(200)
      .send({ msg: "disponibilité modifiée", disponibility });
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "Veuillez corriger les informations saisies", error });
  }
};
