import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Disponibility.css";
import {
  getDisponibility,
  updateDisponibility,
} from "../../JS/Actions/disponibility";
import DisponibilityCard from "./DisponibilityCard";

const Disponibility = ({ medecinid }) => {
  const dispatch = useDispatch();

  const disponibilityReducer = useSelector(
    (state) => state.disponibilityReducer.disponibility
  );

  const Days = useSelector(
    (state) => state.disponibilityReducer.disponibilityDays
  );
  const interval = disponibilityReducer.interval;

  useEffect(() => {
    dispatch(getDisponibility(medecinid));
  }, [dispatch, medecinid]);

  return (
    <div className="Disponibility">
      <div className="interval">
        <h5>
          {" "}
          Veuillez choisir l'intervale de temps espaçant les rendez-vous :{" "}
          <select
            style={{ fontSize: "1rem" }}
            onChange={(e) => {
              dispatch(
                updateDisponibility(medecinid, { interval: e.target.value })
              );
            }}
          >
            <option value="" selected disabled hidden>
              {" "}
              {interval % 60 ? (interval % 60) + " minutes" : "1 heure"}
            </option>
            <option value={60}> 1 heure</option>
            <option value={30}> 30 minutes</option>
            <option value={15}> 15 minutes</option>
          </select>
        </h5>
      </div>

      <div className="day">
        {Days.map((Day, i) => (
          <div key={i}>
            <DisponibilityCard
              interval={interval}
              Day={Day}
              medecinid={medecinid}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disponibility;
