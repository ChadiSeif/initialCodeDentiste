import React, { useState, useEffect } from "react";
import MedecinListIndexPage from "../../Components/Medecin/MedecinListIndexPage";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./index.css";

const Index = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (name === "" && city === "") {
      setActive(false);
    }
  }, [name, city]);

  return (
    <div className="landpage">
      <h1 style={{ fontweight: "bold", width: "80vw" }}>
        Trouvez en Tunisie un chirurgien-dentiste proposant la prise de
        rendez-vous en ligne
      </h1>
      <div className="intro">
        {/* <p style={{ fontSize: "30px", fontWeight: "bold" }}>
          Trouvez en Tunisie un chirurgien-dentiste proposant la prise de
          rendez-vous en ligne
        </p> */}
      </div>
      <div className="form">
        <input
          className="input1"
          placeholder="Nom du médecin ..."
          onChange={(e) => {
            setName(e.target.value);
            setActive(true);
          }}
        />

        <input
          className="input2"
          placeholder="Ville..."
          onChange={(e) => {
            setCity(e.target.value);
            setActive(true);
          }}
        ></input>
        <Link to="/liste-des-medecins">
          <button className="Button">Rechercher</button>
        </Link>
      </div>

      {active ? (
        <div className="listmedecin">
          <MedecinListIndexPage name={name} city={city} />
        </div>
      ) : null}

      <div className="landpageInformation">
        <h3> Pourquoi prendre rendez-vous avec Dentiste.tn ?</h3>
        <div className="landpageArguments">
          <div>
            <img
              style={{ height: "170px" }}
              src="/assets/247.svg"
              alt="24himage"
            />
            <p>Prener rendez vous en ligne, 24h/24 et 7j/7</p>
          </div>
          <div>
            <img
              style={{ height: "170px" }}
              src="/assets/historique.svg"
              alt="24himage"
            />
            <p>Retrouver votre historique de rendez-vous</p>
          </div>
          <div>
            <img
              style={{ height: "170px", width: "200px" }}
              src="/assets/contract.svg"
              alt="24himage"
            />
            <p>Acceder à vos documents médicaux</p>
          </div>
          <div>
            <img
              style={{ height: "170px" }}
              src="/assets/schedule.svg"
              alt="24himage"
            />
            <p>
              Voir instantanément toutes les disponibilités de votre docteur
            </p>
          </div>
        </div>
      </div>
      {/* <div className="listmedecin">
        <Medecin name={name} city={city} />
      </div> */}
      <div className="medecinlandpageinformations">
        <div>
          <h3> Vous êtes médecin dentiste ?</h3>
          <ul>
            <li>Réduisez l'absentéisme de vos patients</li>
            <li>Simplifiez la vie de vos patients</li>
            <li>Partage en ligne des ordonnances et documents</li>
            <li>
              Devenez mieux référencé dans les moteurs de recherche et gagnez en
              visibilité.{" "}
            </li>
          </ul>
          <Link to={"/LoginMedecin"}>
            <Button variant="dark">En savoir plus</Button>
          </Link>
        </div>
        <img src="/assets/dentist_illustrator.jpg" alt="docimg" />
      </div>
    </div>
  );
};

export default Index;
