import React from "react";
import { loadCldr } from "@syncfusion/ej2-base";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  // EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import "./Schedular.css";

const Schedular = ({ RdvMedecin }) => {
  loadCldr(
    require("cldr/supplemental/numberingSystems.json"),
    require("cldr/main/fr/ca-gregorian.json"),
    require("cldr/main/fr/numbers.json"),
    require("cldr/main/fr/timeZoneNames.json")
  );

  const EventSettingsModel = {
    dataSource: RdvMedecin,
  };

  // const onPopupOpen = (args) => {
  //   args.element.innerHTML = "";
  // };
  ///////////////////////

  return (
    <div className="schedular">
      <div
        className="scheduleComponent"
        style={{
          width: "90%",
          // margin: "auto",
          // marginTop: "30px",
        }}
      >
        <ScheduleComponent
          showTimeIndicator={false}
          locale="fr"
          selectedDate={new Date(Date.now())}
          startHour="07:00"
          endHour="21:00"
          eventSettings={EventSettingsModel}
          popupOpen="disabled"
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </div>
  );
};

export default Schedular;
