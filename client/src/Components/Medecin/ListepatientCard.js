import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Modal, Button } from "react-bootstrap";

import "./ListepatientCard.css";

const ListepatientCard = ({ patient }) => {
  const listepatients = useSelector((state) => state.RdvReducer.RdvMedecin);

  const rendezvous = listepatients.filter(
    (rdv) => rdv.user._id === patient._id
  );

  //**Modal Functions */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="Card">
      <Card
        style={{
          width: "11rem",
          margin: "10px",
          fontSize: "16px",
        }}
      >
        <Card.Img
          variant="top"
          src="/assets/personlogo.png"
          style={{ padding: "10px" }}
        />
        <Card.Body>
          <p>
            {patient.nom} {patient.prenom}
          </p>

          <Button variant="outline-dark" onClick={handleShow} size="sm">
            plus de détail
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {patient.nom} {patient.prenom}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Date de naissance : {patient.dateDeNaissance}
            </Modal.Body>
            <Modal.Body>Numéro de téléphone : {patient.numero}</Modal.Body>
            <Modal.Body>Rendez-vous:</Modal.Body>
            {rendezvous.map((rdv) => (
              <Modal.Body>
                <ul>
                  A consulté le {rdv.date} pour {rdv.Subject}
                </ul>
              </Modal.Body>
            ))}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListepatientCard;
