import React, { useState } from "react";
import { Navbar, Container, FormControl, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListepatientCard from "./ListepatientCard.js";

import "./Listepatients.css";

const Listepatients = () => {
  const listepatients = useSelector((state) => state.RdvReducer.RdvMedecin);
  const patients = listepatients.map((patient) => patient.user);
  const key = "_id";
  const patientUniqueByKey = [
    ...new Map(patients.map((patient) => [patient[key], patient])).values(),
  ];
  console.log(patientUniqueByKey);

  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");

  return (
    <div className="listepatients">
      <div className="searchBar">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Collapse
              id="navbarScroll"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Nom du patient..."
                  className="me-2"
                  style={{ width: "300px" }}
                  aria-label="Search"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="Date de naissance jj/mm/aaaa"
                  className="me-3"
                  aria-label="Search"
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                />
              </Form>
              <Button variant="primary">Rechercher</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="patients">
        {name
          ? patientUniqueByKey
              .filter((patient, i) =>
                patient.nom.toLowerCase().includes(name.toLowerCase())
              )
              .map((patient, i) => (
                <div key={i}>
                  <ListepatientCard patient={patient} />
                </div>
              ))
          : DOB
          ? patientUniqueByKey
              .filter((patient, i) => patient.dateDeNaissance.includes(DOB))
              .map((patient, i) => (
                <div key={i}>
                  <ListepatientCard patient={patient} />
                </div>
              ))
          : name && DOB
          ? patientUniqueByKey
              .filter(
                (patient, i) =>
                  patient.nom.toLowerCase().includes(name) &&
                  patient.dateDeNaissance.includes(DOB)
              )
              .map((patient, i) => (
                <div key={i}>
                  <ListepatientCard patient={patient} />
                </div>
              ))
          : patientUniqueByKey.map((patient, i) => (
              <div key={i}>
                <ListepatientCard patient={patient} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Listepatients;
