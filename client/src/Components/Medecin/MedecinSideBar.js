import React from "react";
import "./MedecinSideBar.scss";
import moment from "moment";

const MedecinSideBar = ({ medecinid, RdvMedecin }) => {
  const today = moment(new Date()).format("DD/MM/YYYY");
  const numVisitToday = RdvMedecin.filter(
    (rdv, i) => rdv.date === today
  ).length;
  const totalVisits = RdvMedecin.map((rdv) => rdv).length;

  return (
    <div className="MedecinSideBar">
      <header className="header" role="banner">
        <h1 className="logo">
          <a href={`/Dr/${medecinid}/Profil`}>
            Bienvenue <span> docteur !</span>
          </a>
        </h1>
        <div className="nav-wrap">
          <nav className="main-nav" role="navigation">
            <ul className="unstyled list-hover-slide">
              <li>
                <a href={`/Dr/${medecinid}/Rendez-vous`}>Rendez-vous</a>
              </li>
              <li>
                <a href={`/Dr/${medecinid}/Profil`}>Profil</a>
              </li>
              <li>
                <a href={`/Dr/${medecinid}/ListePatients`}>
                  Liste des patients
                </a>
              </li>
              <li>
                <a href={`/Dr/${medecinid}/Disponibilite`}>
                  Ajuster disponibilité
                </a>
              </li>
              <li>
                <p className="plus">
                  Rendez-vous d'aujourd'hui : <span>{numVisitToday}</span>
                </p>
              </li>
              <li>
                <p className="plus">
                  Total des rendez-vous : <span>{totalVisits}</span>
                </p>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default MedecinSideBar;
