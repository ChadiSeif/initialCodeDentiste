import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const footer = () => {
  return (
    <div className="footer">
      <div className="Logo">
        <img src="/logo.png" alt="logo" style={{ width: "50px" }} />
      </div>
      <div>
        <ul className="footerRdv" style={{ listStyleType: "none" }}>
          <Link to={"/About-Us"}>
            <a style={{ color: "inherit" }} href="/About-Us">
              Qui somme nous ?
            </a>
          </Link>
          <li>Conditions Générales d'Utilisation</li>
          <li>Politique de Confidentialité</li>
        </ul>
      </div>

      <div>
        <ul className="contact">
          <li>Nous contacter : </li>
          <li>+21624414870 </li>
          <li>tndentiste@gmail.com </li>
        </ul>
      </div>
      <div className="copyright">
        <p> Copyright © 2021 Dentiste.tn Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default footer;
