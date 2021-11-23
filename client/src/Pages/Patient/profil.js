import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { GetRdvUser } from "../../JS/Actions/Rdv";

import ProfileRdv from "../../Components/PatientProfile/ProfileRdv";
import Demandes from "../../Components/PatientProfile/Demandes";
import ProfilInformations from "../../Components/PatientProfile/ProfilInformations";
import DossierMedical from "../../Components/PatientProfile/DossierMedical";

import SideBar from "./SideBar";
import "./profil.css";

const Profil = ({ location }) => {
  ////************Set USER state */

  const [user, setuser] = useState({
    prenom: "",
    nom: "",
    numero: "",
    email: "",
    dateDeNaissance: "",
    motdepass: "",
  });

  ////************Get USER and Rdv reducers from Store */
  const userRed = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  //***************Get user Id */
  const userid = location.pathname.substring(8, 32);

  useEffect(() => {
    setuser(userRed);
    dispatch(GetRdvUser(userid));
    // eslint-disable-next-line
  }, [userRed, userid]);

  return (
    <div className="profile">
      <div className="profileSideBar">
        <SideBar user={user} />
      </div>
      <div className="profileContainer">
        <Switch>
          <Route exact path="/Profil/:id/" component={ProfileRdv} />
          <Route exact path="/Profil/:id/Rdv" component={ProfileRdv} />
          <Route
            exact
            path="/Profil/:id/informations"
            render={(props) => (
              <ProfilInformations
                user={user}
                setuser={setuser}
                userid={userid}
              />
            )}
          />
          <Route
            exact
            path="/Profil/:id/DossierMedical"
            component={DossierMedical}
          />
          <Route exact path="/Profil/:id/Demande" component={Demandes} />
        </Switch>
      </div>
    </div>
  );
};

export default Profil;
