import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Table, Button } from "react-bootstrap";
import "./Accueil.css";
import { deleteRdv, UpdateRdv } from "../../../JS/Actions/Rdv";

const Accueil = () => {
  const RdvMedecin = useSelector((state) => state.RdvReducer.RdvMedecin);

  const dispatch = useDispatch();
  const Tablehead = ({ eventKey }) => {
    return (
      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Nom de patient</th>
            <th>Date de rendez-vous</th>
            <th>Motif de consultation</th>
            <th>Statut</th>
            <th style={{ width: "26%" }}>Confirmer ou annuler</th>
          </tr>
        </thead>
        {
          (eventKey = "allrdz" ? (
            <tbody>
              {RdvMedecin.map((rdv) => (
                <tr key={rdv._id}>
                  <td>
                    {rdv.user.firstName} {rdv.user.lastName}
                  </td>
                  <td>
                    {rdv.date} à {rdv.hour}
                  </td>
                  <td> {rdv.Consulting}</td>
                  <td>
                    {rdv.confirmed ? (
                      <Button disabled size="sm" variant="success">
                        confirmé
                      </Button>
                    ) : (
                      <Button disabled size="sm" variant="danger">
                        en attente
                      </Button>
                    )}
                  </td>
                  <td>
                    <span>
                      {!rdv.confirmed ? (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() =>
                            dispatch(UpdateRdv(rdv._id, { confirmed: true }))
                          }
                        >
                          Confirmer
                        </Button>
                      ) : null}
                      {/* <Button variant="warning" size="sm">
                        Reporter
                      </Button> */}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch(deleteRdv(rdv._id))}
                      >
                        Annuler
                      </Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null)
        }
      </Table>
    );
  };

  return (
    <div className="AccueilDoctor">
      <Tabs
        defaultActiveKey="today"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="today" title="Aujourd'hui">
          <Tablehead eventKey="today" />
        </Tab>
        <Tab eventKey="coming" title="A venir">
          <Tablehead />
        </Tab>
        <Tab eventKey="allrdz" title="Tous les rendez-vous">
          <Tablehead />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Accueil;
