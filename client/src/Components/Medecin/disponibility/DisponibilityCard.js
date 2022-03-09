import React, { useState } from "react";
import Toggle from "react-toggle";
import { useDispatch } from "react-redux";
import { updateDisponibilityDay } from "../../../JS/Actions/disponibility";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import TimePicker from "react-bootstrap-time-picker";
import { timeFromInt } from "time-number";
import "./DisponibilityCard.css";

const DisponibilityCard = ({ interval, medecinid, Day }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [valueStartM, setValueStartM] = useState("");
  const [valueEndM, setValueEndM] = useState("");
  const [valueStartAN, setvalueStartAN] = useState("");
  const [valueEndAN, setValueEndAN] = useState("");

  const [informations, setinformations] = useState({
    Day: Day.Day,
    StartM: "",
    EndM: "",
    StartAN: "",
    EndAN: "",
    error: "",
  });

  return (
    <div>
      <div className="DisponibilityCard">
        <label>
          <Toggle
            checked={Day.Status}
            aria-label="No label tag"
            name="Mon"
            onChange={() =>
              dispatch(
                updateDisponibilityDay(medecinid, {
                  Day: Day.Day,
                  Status: !Day.Status,
                })
              )
            }
          />
        </label>

        <div className="Days">
          <p>{Day.Day}</p>
          <div>
            {Day.Status === false ? (
              <p> Indisponible toute la journée </p>
            ) : (
              <p>
                {Day.StartM} - {Day.EndM} / {Day.StartAN} - {Day.EndAN}{" "}
              </p>
            )}
          </div>
        </div>

        {/* *************************** Modal  */}
        <>
          {Day.Status ? <FiEdit onClick={handleShow} size="1.125em" /> : null}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modifier votre disponibilité :</Modal.Title>
            </Modal.Header>
            <Row className="mb-3" style={{ padding: "20px" }}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Le matin à partir de </Form.Label>
                <TimePicker
                  start="06:00"
                  end="23:00"
                  format={24}
                  step={interval}
                  onChange={setValueStartM}
                  initialValue={Day.StartM}
                  value={valueStartM}
                  onClick={() =>
                    setinformations({
                      ...informations,
                      StartM: timeFromInt(Number(valueStartM)),
                    })
                  }
                  // onClick={() => HandleChange}
                />
                <Form.Label>jusqu'à</Form.Label>
                <TimePicker
                  start={timeFromInt(Number(valueStartM))}
                  end="23:00"
                  format={24}
                  step={interval}
                  initialValue={Day.EndM}
                  onChange={setValueEndM}
                  value={valueEndM}
                  onClick={() =>
                    setinformations({
                      ...informations,
                      EndM: timeFromInt(Number(valueEndM)),
                    })
                  }
                />
                <Form.Label>L'aprés midi à partir de : </Form.Label>

                <TimePicker
                  start={timeFromInt(Number(valueEndM))}
                  end="23:00"
                  format={24}
                  step={interval}
                  initialValue={Day.StartAN}
                  onChange={setvalueStartAN}
                  value={valueStartAN}
                  onClick={() =>
                    setinformations({
                      ...informations,
                      StartAN: timeFromInt(Number(valueStartAN)),
                    })
                  }
                />
                <Form.Label>jusqu'à</Form.Label>
                <TimePicker
                  start={timeFromInt(Number(valueStartAN))}
                  end="24:00"
                  format={24}
                  step={interval}
                  initialValue={Day.EndAN}
                  onChange={setValueEndAN}
                  value={valueEndAN}
                  onClick={() =>
                    setinformations({
                      ...informations,
                      EndAN: timeFromInt(Number(valueEndAN)),
                    })
                  }
                />
              </Form.Group>
            </Row>
            {/* {valueStartM > valueEndM > valueStartAN > valueEndAN
              ? seterror("")
              : seterror("error")} */}

            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  dispatch(updateDisponibilityDay(medecinid, informations));
                }}
              >
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default DisponibilityCard;
