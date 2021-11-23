import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Calendar } from "react-calendar";
import { Button, Card } from "react-bootstrap";

import { Current, PrendreRdv } from "../../JS/Actions/user";
import { getDisponibility } from "../../JS/Actions/disponibility";
import { addRdv, GetRdvMedecin } from "../../JS/Actions/Rdv";

import SimpleMap from "../../Components/GoogleMaps/GoogleMapReact";
import RDVtime from "../../Components/RDV/RDVtime";

import moment from "moment";
import "moment/locale/fr";
import "./RDV.css";

const RDV = ({ location, history }) => {
  let token = localStorage.getItem("token");

  //**Get informations from Store */
  const medecinid = location.pathname.substring(5);
  const medecinRDV = useSelector((state) => state.userReducer.medecinRDV);
  const userId = useSelector((state) => state.userReducer.user._id);
  const disponibilityReducer = useSelector(
    (state) => state.disponibilityReducer.disponibility
  );
  const Days = useSelector(
    (state) => state.disponibilityReducer.disponibilityDays
  );
  const error = useSelector((state) => state.RdvReducer.error);
  const success = useSelector((state) => state.RdvReducer.success);
  const [successRedirect, setsuccessRedirect] = useState("");

  //**Dispatching informations to Store */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(PrendreRdv(medecinid));
    dispatch(GetRdvMedecin(medecinid));
    dispatch(Current());
    dispatch(getDisponibility(medecinid));
    setRdv({ ...Rdv, user: userId });
    // eslint-disable-next-line
  }, [dispatch, userId]);

  //** picking Date from calendar */
  const [value, onChangeValue] = useState(new Date());
  console.log(value.getDate());
  const valueformString = value.toLocaleDateString("fr-FR");
  const datepicked = String(value).substring(0, 15);
  const daypicked = String(value).substring(0, 3);

  //Add 30 minutes to start Date
  const [StartingTime, setStartTime] = useState("");
  const format = "HH:mm";
  const EndtimeFormatDate = moment(StartingTime, format).add(30, "m").toDate();
  const EndingTime = String(EndtimeFormatDate).substring(16, 21);

  // RDV
  const [Rdv, setRdv] = useState({
    date: "",
    hour: "",
    hourfinishing: "",
    StartTime: "",
    EndTime: "",
    Subject: "",
    user: userId,
    medecin: medecinid,
    image: "",
  });
  console.log(Rdv);

  //Function upload image
  const onChangeFile = (e) => {
    setRdv({ ...Rdv, image: e.target.files[0] });
  };

  //Dispatching Rdv
  const formData = new FormData();
  formData.append("date", Rdv.date);
  formData.append("hour", Rdv.hour);
  formData.append("StartTime", Rdv.StartTime);
  formData.append("EndTime", Rdv.EndTime);
  formData.append("Subject", Rdv.Subject);
  formData.append("user", Rdv.user);
  formData.append("medecin", Rdv.medecin);
  formData.append("image", Rdv.image);

  //Get list of hours selected in a day //

  const listRdvmedecin = useSelector((state) => state.RdvReducer.RdvMedecin);
  const listRdvInDay = listRdvmedecin.filter(
    (Rdv) => Rdv.date === valueformString
  );
  const HoursInDay = listRdvInDay.map((Rdv) => Rdv.hour);

  // **Redirect after Confirming */
  const redirectfunction = () => {
    setTimeout(function () {
      history.push(`/Profil/${Rdv.user}/Rdv`);
    }, 2000);
  };

  return (
    <div className="RDVmedecincontainer">
      {token === null ? (
        <Redirect to="/CheckRdv" />
      ) : (
        <div className="RDVmedecin">
          <div className="RDVprofile">
            <Card style={{ width: "400px" }}>
              {medecinRDV.gender === "male" ? (
                <Card.Img
                  variant="top"
                  src="/assets/logomale.svg"
                  style={{ maxWidth: "50%", margin: "auto", padding: "10px" }}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src="/assets/logowoman.svg"
                  style={{ maxWidth: "50%", margin: "auto", padding: "10px" }}
                />
              )}
              <Card.Body>
                <Card.Title className="text-center">
                  Dr: {medecinRDV.firstname} {medecinRDV.lastname}
                </Card.Title>
                <br />
                <Card.Text className="text-left">
                  Specialité: {medecinRDV.speciality}
                </Card.Text>
                <Card.Text className="text-left">
                  Addresse: {medecinRDV.address},{medecinRDV.city}
                </Card.Text>
                <Card.Text className="text-left">
                  Contact: {medecinRDV.phone}
                </Card.Text>
              </Card.Body>
              <div className="Profilmap" style={{ margin: "20px" }}>
                <SimpleMap />
              </div>
            </Card>
          </div>

          <div className="RDVDate">
            <h4 style={{ marginBottom: "20px" }}>
              Veuillez choisir la date et l'heure de votre rendez-vous
            </h4>

            <div className="timeContainer">
              <div>
                <Calendar
                  value={value}
                  minDate={moment().toDate()}
                  onChange={onChangeValue}
                />
                <select
                  style={{
                    width: "350px",
                    height: "50px",
                    marginTop: "10px",
                    border: "1px solid rgba(172, 168, 168, 0.43)",
                  }}
                  onChange={(e) => {
                    setRdv({
                      ...Rdv,
                      Subject: e.target.value,
                      date: value.toLocaleDateString("fr-FR"),
                      hour: `${StartingTime}`,
                      StartTime: `${datepicked} ${StartingTime}`,
                      EndTime: `${datepicked} ${EndingTime}`,
                    });
                  }}
                >
                  <option>Pourquoi vous consultez ??</option>
                  <option value="1ére consultation">
                    Consultation (première visite)
                  </option>
                  <option value="Contrôle">Contrôle</option>
                  <option value="détartrage">Détartrage</option>
                  <option value="Suite de traitement">
                    Suite de traitement
                  </option>
                  <option value="Autre...">Autre...</option>
                </select>
              </div>
              <div className="Time">
                {Days.filter((Day) => Day.Code === daypicked).map((Day) =>
                  Day.Status ? (
                    <RDVtime
                      disponibilityReducer={disponibilityReducer}
                      Day={Day}
                      setRdv={setRdv}
                      setStartTime={setStartTime}
                      Rdv={Rdv}
                      HoursInDay={HoursInDay}
                    />
                  ) : (
                    <h5>Pas de disponibilité pour ce jour </h5>
                  )
                )}
              </div>
            </div>
            <div className="upload">
              <h6 style={{ margin: "auto" }}>
                Si vous possédez une radiographie panoramique merci de l'ajouter{" "}
              </h6>
              <div style={{ margin: "20px" }}>
                <form
                  action="/profile"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <input type="file" name="image" onChange={onChangeFile} />
                </form>
              </div>
            </div>
            <Button
              style={{ margin: "20px", borderColor: "lightgrey" }}
              variant="info"
              onClick={() => {
                dispatch(addRdv(formData, history));
                setsuccessRedirect(true);
              }}
              size="lg"
            >
              Confirmer
            </Button>

            {error && !success ? (
              <form style={{ color: "red", fontSize: "12px" }}>
                <p>
                  {error.map((error) => (
                    <p>{error.msg}</p>
                  ))}
                </p>
              </form>
            ) : success && successRedirect ? (
              <div>
                <h5> Merci d'avoir choisi Dr {medecinRDV.lastname}</h5>
                {redirectfunction()}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default RDV;
