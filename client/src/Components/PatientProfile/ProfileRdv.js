import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { deleteRdv } from "../../JS/Actions/Rdv";

import "./ProfileRdv.css";

const ProfileRdv = () => {
  const RdvUser = useSelector((state) => state.RdvReducer.RdvUser);
  const dispatch = useDispatch();

  return (
    <div
      className="ProfileRdv"
      style={{ margin: "30px 0 ", backgroundColor: "white" }}
    >
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Docteur</th>
            <th>Date et heure</th>
            <th>Adresse</th>
            <th>Numéro de téléphone</th>
            <th>Motif de consultation</th>
          </tr>
        </thead>
        <tbody>
          {RdvUser.map((Rdv, i) => (
            <tr>
              <td>
                Dr : {Rdv.medecin.firstname} {Rdv.medecin.lastname}
              </td>
              <td>
                {Rdv.date} {Rdv.hour}
              </td>
              <td>{Rdv.medecin.address}</td>
              <td>{Rdv.medecin.phone}</td>
              <td>{Rdv.Subject}</td>
              <Button
                style={{ margin: "5px" }}
                variant="danger"
                onClick={() => dispatch(deleteRdv(Rdv._id))}
              >
                Annuler le Rdv
              </Button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProfileRdv;
