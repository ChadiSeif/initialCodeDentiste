import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Current } from "./JS/Actions/user";
import { currentMedecin } from "./JS/Actions/medecin";
import "./App.css";
import Index from "./Pages/Landpage/index";
import Profil from "./Pages/Patient/profil";
import Login from "./Pages/Login/login";
import Register from "./Pages/RegisterPatient/register";
import Error from "./Pages/Errors/error";
import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import PrivateRoute from "./Routes/PrivateRoute";
import RDV from "./Pages/RDV/RDV";
import Medecin from "./Pages/Medecin/Medecin";
import LoginMedecin from "./Pages/Medecin/LoginMedecin";
import ListMedecin from "./Pages/ListMedecin/ListMedecin";
import AboutUs from "./Pages/AboutUs/aboutUs";
import RdvCheck from "./Pages/RdvCheck/RdvCheck";
import Accueil from "./Components/Medecin/accueil/Accueil";
import MedecinCardProfil from "./Components/Medecin/parametreProfil/MedecinCardProfil";
import Disponibility from "./Components/Medecin/disponibility/Disponibility";
import Listepatients from "./Components/Medecin/archivePatients/Listepatients";
import Schedular from "./Components/Schedular/Schedular";

function App() {
  const [Doctorlogged, setDoctorlogged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Doctorlogged ? dispatch(currentMedecin()) : dispatch(Current());
  }, [Doctorlogged, dispatch]);

  return (
    <div className="App">
      <header className="App-header">{<Navbar />}</header>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route
          path="/Profil/:_id"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/RDV" element={<RDV />} />
        <Route path="/Register" element={<Register />} />
        <Route exact path="/Dr/:_id" element={<Medecin />}>
          <Route index element={<Accueil />} />
          <Route path="Accueil" element={<Accueil />} />
          <Route path="Rendez-vous" element={<Schedular />} />
          <Route path="Profil" element={<MedecinCardProfil />} />
          <Route path="ListePatients" element={<Listepatients />} />
          <Route path="Disponibilite" element={<Disponibility />} />
        </Route>
        <Route path="/liste-des-medecins" element={<ListMedecin />} />

        <Route path="/About-Us" element={<AboutUs />} />
        <Route
          path="/LoginMedecin/"
          element={<LoginMedecin setDoctorlogged={setDoctorlogged} />}
        />
        <Route path="/CheckRdv" element={<RdvCheck />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
