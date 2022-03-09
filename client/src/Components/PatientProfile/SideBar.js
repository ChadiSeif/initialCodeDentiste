import React from "react";

import "./SideBar.scss";

const SideBar = ({ user }) => {
  return (
    <div className="Sidebar">
      <header className="header" role="banner">
        <h1 className="logo">
          <a href={`/Profil/informations`} style={{ margin: "10px" }}>
            {user.firstName} <span>{user.lastName}</span>
          </a>
        </h1>
        <div className="nav-wrap">
          <nav className="main-nav" role="navigation">
            <ul className="unstyled list-hover-slide">
              <li>
                <a href={`/Profil/Rdv`}>Rendez-vous</a>
              </li>
              <li>
                <a href={`/Profil/informations`}>Profil</a>
              </li>
              <li>
                <a href={`/Profil/DossierMedical`}>Dossier medical</a>
              </li>
              <li>
                <a href={`/Profil/Demandes`}>Demandes</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default SideBar;
