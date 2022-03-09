import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Modal, Button } from "react-bootstrap";
import ImageUploaded from "../../FileUpload/ImageUploaded";

import "./ListepatientCard.css";

const ListepatientCard = ({ patient }) => {
  const listepatients = useSelector((state) => state.RdvReducer.RdvMedecin);

  const rendezvous = listepatients.filter(
    (rdv) => rdv.user._id === patient._id
  );

  console.log(rendezvous);
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
            {patient.lastName} {patient.firstName}
          </p>

          <Button variant="outline-dark" onClick={handleShow} size="sm">
            plus de détail
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {patient.lastName} {patient.firstName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Date de naissance : {patient.dateOfBirth}</Modal.Body>
            <Modal.Body>Numéro de téléphone : {patient.phone}</Modal.Body>
            <Modal.Body>Rendez-vous:</Modal.Body>
            {rendezvous.map((Rdv) => (
              <Modal.Body>
                <ul>
                  A consulté le {Rdv.date} pour {Rdv.Consulting}
                </ul>
                {Rdv.image ? (
                  <h5 style={{ cursor: "pointer" }}>
                    <ImageUploaded Rdv={Rdv} />
                  </h5>
                ) : null}
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
