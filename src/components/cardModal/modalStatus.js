import React from "react";
import { Icons } from "oce-components/build";
import style from "./index.css";

const Status = ({ isFinished }) => (
  <div className={style.labels_actions}>
    <div
      className={
        isFinished
          ? style.labels_isFinished
          : style.labels_isFinished + " " + style.incomplete
      }
    >
      <span className={style.labels_icon}>
        {isFinished ? (
          <Icons.Check width="18" height="18" color="#36B37E" />
        ) : (
          <Icons.Cross width="18" height="18" color="#FFAB00" />
        )}
      </span>
      <h5>{isFinished ? "Completed" : "Incompleted"}</h5>
    </div>
  </div>
);

export default Status;
