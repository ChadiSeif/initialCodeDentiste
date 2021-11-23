const mongoose = require("mongoose");
const Medecin = require("./Medecin");
const { Schema } = mongoose;

// const DispDay = new Schema({ type: Boolean, default: true });
// const Disp = [
//   { type: Boolean, Disp: true },
//   { From: "08:00", To: "12:00" },
//   { From: "14:00", To: "18:00" },
// ];
const disponibilitySchema = new Schema({
  Days: {
    type: Array,
    default: [
      {
        Day: "Lundi",
        Code: "Mon",
        Status: true,
        StartM: "08:00",
        EndM: "12:00",
        StartAN: "14:00",
        EndAN: "18:00",
      },
      {
        Day: "Mardi",
        Code: "Tue",
        Status: true,
        StartM: "08:00",
        EndM: "12:00",
        StartAN: "14:00",
        EndAN: "18:00",
      },
      {
        Day: "Mercredi",
        Code: "Wed",
        Status: true,
        StartM: "08:00",
        EndM: "12:00",
        StartAN: "14:00",
        EndAN: "18:00",
      },
      {
        Day: "Jeudi",
        Code: "Thu",
        Status: true,
        StartM: "08:00",
        EndM: "12:00",
        StartAN: "14:00",
        EndAN: "18:00",
      },
      {
        Day: "Vendredi",
        Code: "Fri",
        Status: true,
        StartM: "08:00",
        EndM: "12:00",
        StartAN: "14:00",
        EndAN: "18:00",
      },
      {
        Day: "Samedi",
        Code: "Sat",
        Status: true,
        StartM: "08:00",
        EndM: "12:00",
        StartAN: "14:00",
        EndAN: "18:00",
      },
      {
        Day: "Dimanche",
        Code: "Sun",
        Status: true,
        StartM: "08:00",
        EndM: "12:00",
        StartAN: "14:00",
        EndAN: "18:00",
      },
    ],
  },
  interval: {
    type: Number,
    default: 60,
  },
  medecinid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medecin",
  },
});

module.exports = Disponibility = mongoose.model(
  "disponibility",
  disponibilitySchema
);
