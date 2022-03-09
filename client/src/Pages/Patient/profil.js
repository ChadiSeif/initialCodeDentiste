import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { GetRdvUser } from "../../JS/Actions/Rdv";
import { Current } from "../../JS/Actions/user";
import ProfileRdv from "../../Components/PatientProfile/ProfileRdv";
import Demandes from "../../Components/PatientProfile/Demandes";
import ProfilInformations from "../../Components/PatientProfile/ProfilInformations";
import DossierMedical from "../../Components/PatientProfile/DossierMedical";
import SideBar from "../../Components/PatientProfile/SideBar";

import "./profil.css";

const Profil = ({ location }) => {
  ////**Set USER state */

  const [user, setuser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    password: "",
  });

  //**Get USER and Rdv reducers from Store */
  const dispatch = useDispatch();

  //**Get user Id */
  // const userid = location.pathname.substring(8, 32);
  // const userid = jwt.decode(localStorage.getItem("authorization"));

  useEffect(() => {
    Current();
    // eslint-disable-next-line
  }, []);

  const userRed = useSelector((state) => state.userReducer.user);
  const userid = userRed._id;

  useEffect(() => {
    setuser(userRed);
    dispatch(GetRdvUser(userid));
  }, [userRed, userid, dispatch]);

  return (
    <div className="profile">
      <div className="profileSideBar">
        <SideBar user={user} />
      </div>
      <div className="profileContainer">
        <Routes>
          <Route exact path="/Profil/" component={ProfileRdv} />
          <Route exact path="/Profil/Rdv" component={ProfileRdv} />
          <Route
            exact
            path="/Profil/informations"
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
        </Routes>
      </div>
    </div>
  );
};

export default Profil;
