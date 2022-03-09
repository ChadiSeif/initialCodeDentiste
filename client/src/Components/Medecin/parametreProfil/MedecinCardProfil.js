import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { UpdateMedecin } from "../../../JS/Actions/medecin";

import "./MedecinCardProfil.css";

const MedecinCardProfil = ({ setActiveRdv, activeRdv }) => {
  const medecinInfo = useSelector((state) => state.medecinReducer.medecin);
  const [medecin, setmedecin] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    speciality: "",
    address: "",
    city: "",
    password: "",
  });

  useEffect(() => {
    setmedecin(medecinInfo);
  }, [medecinInfo]);

  const dispatch = useDispatch();
  const HandleChange = (e) => {
    setmedecin({ ...medecin, [e.target.name]: e.target.value });
  };

  return (
    <div className="medecinprofil">
      <Form>
        <div>
          <hr />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridlastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={medecin.lastname}
                onChange={HandleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={medecin.firstname}
                onChange={HandleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Addresse </Form.Label>
            <Form.Control
              name="adresse"
              value={medecin.address}
              onChange={HandleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Cité</Form.Label>
              <Form.Control
                name="city"
                value={medecin.city}
                onChange={HandleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridphone">
              <Form.Label>Numéro :</Form.Label>
              <Form.Control
                name="phone"
                value={medecin.phone}
                onChange={HandleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={medecin.email}
                disabled
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Mot de passe :</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value="********"
                disabled
              />
            </Form.Group>
          </Row>
          <hr />
          <Button
            style={{ margin: "50px" }}
            variant="outline-dark"
            onClick={() => dispatch(UpdateMedecin(medecinInfo._id, medecin))}
          >
            Modifier Profil
          </Button>
        </div>
        {/* ) : null} */}
      </Form>
    </div>
  );
};

export default MedecinCardProfil;
