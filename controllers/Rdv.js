const Rdv = require(".././models/Rdv");
// const moment = require("moment");

exports.Add = async (req, res) => {
  try {
    const {
      date,
      hour,
      hourfinishing,
      StartTime,
      EndTime,
      Subject,
      user,
      medecin,
      Consulting,
    } = req.body;

    const rendezvous = new Rdv({
      date,
      hour,
      hourfinishing,
      StartTime,
      EndTime,
      Subject,
      user,
      medecin,
      Consulting,
    });
    if (req.file) {
      rendezvous.image = req.file.path;
    }
    await rendezvous.save();
    return res
      .status(200)
      .send({ msg: "Rendez vous bien enregistré", rendezvous });
  } catch (error) {
    return res.status(400).send({
      errors: [{ msg: " Prise de rendez vous non effectuée !" }],
    });
  }
};

exports.listeRdv = async (req, res) => {
  try {
    const listeRdv = await Rdv.find()
      .populate("user", "id")
      .populate("medecin");
    return res.status(200).send({ msg: "Liste des rendez vous", listeRdv });
  } catch (error) {
    return res.status(400).send({
      errors: [{ msg: " erreur aucours de l'importation !" }],
    });
  }
};

exports.userRdv = async (req, res) => {
  try {
    const userRdvToFind = req.params.id;
    const userRdv = await Rdv.find({ user: userRdvToFind })
      .populate("user", "_id")
      .populate("medecin");

    if (!userRdv) {
      return res.status(400).send({
        errors: [
          { msg: `Cher(e) utilisateur vous n'avez aucun rendez vous !` },
        ],
      });
    }
    res
      .status(200)
      .send({ msg: "cher utilisateur le rendez vous souhaité est :", userRdv });
  } catch (error) {
    return res.status(400).send({
      errors: [{ msg: " erreur aucours de l'importation !" }],
    });
  }
};

exports.medecinRdv = async (req, res) => {
  try {
    const medecinRdvToFind = req.params.id;

    const medecinRdv = await Rdv.find({ medecin: medecinRdvToFind })
      .populate("user")
      .populate("medecin", "_id");
    // .populate("user","_id").populate("medecin","_id")
    return res
      .status(200)
      .send({ msg: "Docteur vos rendez-vous sont :", medecinRdv });
  } catch (error) {
    return res.status(400).send({
      errors: [{ msg: " erreur aucours de l'importation !" }],
    });
  }
};

exports.deleteRdv = async (req, res) => {
  try {
    const RdvToFind = req.params.id;

    await Rdv.deleteOne({ _id: RdvToFind });
    return res.status(200).send({ msg: "Rendez-vous supprimé !" });
  } catch (error) {
    return res.status(400).send({
      errors: [{ msg: " erreur aucours de la suppression !" }],
    });
  }
};

exports.updateRdv = Rdvid = async (req, res) => {
  try {
    const Rdvid = req.params.id;
    const Rdvupdated = req.body;
    const result = await Rdv.updateOne(
      { _id: Rdvid },
      { $set: { ...Rdvupdated } }
    );
    return res.status(200).send({ msg: "le rendez-vous est bien modifié" });
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: "update failed..." }] });
  }
};
