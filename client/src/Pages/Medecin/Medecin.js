import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GET_onemedecin } from "../../JS/Actions/medecin";
import { GetRdvMedecin } from "../../JS/Actions/Rdv";

import MedecinCardProfil from "../../Components/Medecin/MedecinCardProfil";
import MedecinSideBar from "../../Components/Medecin/MedecinSideBar";
import Disponibility from "../../Components/Medecin/Disponibility";
import Listepatients from "../../Components/Medecin/Listepatients";
import Schedular from "../../Components/Schedular/Schedular";

import "./Medecin.css";

const Medecin = ({ location }) => {
  const dispatch = useDispatch();

  //***********Get Data from Store */
  const medecin = useSelector((state) => state.medecinReducer.medecin);
  const RdvMedecin = useSelector((state) => state.RdvReducer.RdvMedecin);
  // console.log("les rendez vous :" + RdvMedecin);
  //***************************** */
  const medecinid = location.pathname.substring(4, 28);
  console.log(medecinid);

  useEffect(() => {
    dispatch(GET_onemedecin(medecinid));
    dispatch(GetRdvMedecin(medecinid));
    // eslint-disable-next-line
  }, [dispatch, medecinid]);

  //** controler appartion des rendez vous */
  // const [activeRdv, setActiveRdv] = useState(false);

  return (
    <div classname="medecinall">
      <div className="MedecinSideBar">
        <MedecinSideBar medecinid={medecinid} RdvMedecin={RdvMedecin} />
      </div>

      <Switch>
        <Route
          exact
          path="/Dr/:id/Rendez-vous"
          render={() => <Schedular RdvMedecin={RdvMedecin} />}
        />
        <Route
          exact
          path="/Dr/:id/Profil"
          render={() => <MedecinCardProfil medecinRed={medecin} />}
        />
        <Route exact path="/Dr/:id/ListePatients" component={Listepatients} />
        <Route
          exact
          path="/Dr/:id/Disponibilite"
          render={() => <Disponibility medecinid={medecinid} />}
        />
      </Switch>
    </div>
  );
};

export default Medecin;
