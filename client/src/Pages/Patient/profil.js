import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { GetRdvUser } from "../../JS/Actions/Rdv";
import { Current } from "../../JS/Actions/user";
import SideBar from "../../Components/PatientProfile/SideBar";

import "./profil.css";

const Profil = ({ location }) => {
  ////**Set USER state */

  const [user, setuser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    password: "",
  });

  //**Get USER and Rdv reducers from Store */
  const dispatch = useDispatch();

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
        <Outlet context={[user, setuser]} />
      </div>
    </div>
  );
};

export default Profil;
