import React from "react";
import moment from "moment";
// import { Button } from "react-bootstrap";

import "./RDVtime.css";

const RDVtime = ({
  disponibilityReducer,
  Day,
  setRdv,
  Rdv,
  setStartTime,
  HoursInDay,
}) => {
  //** setting time interval */
  const interval = disponibilityReducer.interval;
  const intervalInSec = interval * 60;

  //**Function converting From String to Seconds */
  const toSeconds = (a) => {
    const splitValue = a.split(":");
    return parseInt(splitValue[0]) * 60 * 60 + parseInt(splitValue[1]) * 60;
  };

  //**Creating array of Time */
  const locale = "fr";
  const Hours = [];
  moment.locale(locale);
  const calculerInterval = (intervalInSec, daystart, finish) => {
    for (let min = daystart; min < finish; min = min + intervalInSec) {
      Hours.push(moment.utc(min * 1000).format("HH:mm"));
    }
  };
  calculerInterval(intervalInSec, toSeconds(Day.StartM), toSeconds(Day.EndM));
  calculerInterval(intervalInSec, toSeconds(Day.StartAN), toSeconds(Day.EndAN));

  ////////////////////////

  return (
    <div className="Time">
      <ul>
        {Hours.filter((hour, i) => !HoursInDay.includes(hour)).map(
          (hour, i) => (
            <li key={`hour${i}`}>
              <button
                className="button-6"
                value={hour}
                onClick={(e) => {
                  setStartTime(e.target.value);
                  setRdv({ ...Rdv, hour: e.target.value });
                }}
              >
                {hour}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default RDVtime;
