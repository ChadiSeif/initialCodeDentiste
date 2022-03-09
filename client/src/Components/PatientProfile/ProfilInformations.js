import React, { useState } from "react";
import { Card, Nav, Button } from "react-bootstrap";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../JS/Actions/user";
import { useOutletContext } from "react-router-dom";
import "./ProfilInformations.css";

const ProfilInformations = () => {
  const [user, setuser] = useOutletContext();

  console.log(user);

  const HandleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  /**Modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="ProfilInformations">
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first"></Nav>
        </Card.Header>
        <div className="bodyInformations">
          <div>
            <h5>
              Email : <span> {user.email}</span>{" "}
            </h5>
          </div>
          <div>
            <h5>
              Nom : <span> {user.firstName} </span>
            </h5>
          </div>
          <div>
            <h5>
              Prénom : <span> {user.lastName}</span>
            </h5>
          </div>
          <div>
            <h5>
              Numéro de téléphone : <span> {user.phone}</span>
            </h5>
          </div>
          <div>
            <h5>
              Date de naissance : <span>{user.dateOfBirth}</span>
            </h5>
          </div>
          <div>
            <Button variant="primary" onClick={handleShow}>
              Modifier Mon Profil
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title> Modifier mon profil</Modal.Title>
              </Modal.Header>

              {/* ********** Form Modal ************** */}
              <Form style={{ width: "400px", marginLeft: "50px" }}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={HandleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={HandleChange}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>dateDeNaissance</Form.Label>
                    <Form.Control
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      onChange={HandleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Numéro :</Form.Label>
                    <Form.Control
                      name="phone"
                      value={user.phone}
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
                      value={user.email}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Mot de passe :</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Nouveau mot de passe"
                      onChange={HandleChange}
                      // value={user.password}
                      // disabled
                    />
                  </Form.Group>
                </Row>
              </Form>

              <Modal.Footer>
                <Button
                  variant="primary"
                  style={{ margin: "auto", marginTop: "20px" }}
                  onClick={() => {
                    dispatch(UpdateUser(user._id, user));
                    handleClose();
                  }}
                >
                  Modifier mes informations
                </Button>
                {/* <Button
                  variant="primary"
                  onClick={() => {
                    dispatch(UpdateUser(userid, user));
                    handleClose();
                  }}
                >
                  Enregistrer
                </Button> */}
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilInformations;
