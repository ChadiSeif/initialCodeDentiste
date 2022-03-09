import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_onemedecin } from "../../JS/Actions/medecin";
import { GetRdvMedecin } from "../../JS/Actions/Rdv";

import MedecinSideBar from "../../Components/Medecin/sideBar/MedecinSideBar";

import "./Medecin.css";

const Medecin = ({ location }) => {
  const dispatch = useDispatch();

  // //***********Get Data from Store */
  const RdvMedecin = useSelector((state) => state.RdvReducer.RdvMedecin);
  //***************************** */

  let medecinid = useParams()._id;

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
      <Outlet />
      {/* <Routes>
$
        <Route
          exact
          path="/Dr/:id/Disponibilite"
          element={<Disponibility medecinid={medecinid} />}
        />
      </Routes> */}
    </div>
  );
};

export default Medecin;
