import React from "react";
import style from "./style.css";
import { NavLink } from "react-router-dom";

export default ({ data }) => (
  <div className={style.header}>
    <h4 className={style.header_name}>Network</h4>
    <div className={style.header_actions}>
      <NavLink
        exact
        activeStyle={{ background: "#3B99FC" }}
        to={`local`}
      >
        Overview
      </NavLink>
      <NavLink
        exact
        activeStyle={{ background: "#3B99FC" }}
        to={`extended`}
      >
        About
      </NavLink>
    </div>
  </div>
);
