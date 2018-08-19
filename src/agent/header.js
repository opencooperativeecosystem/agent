import React from "react";
import style from "./style.css";
import { NavLink } from "react-router-dom";

export default ({ data }) => (
  <div className={style.header}>
    <div
      className={style.header_image}
      style={{
        backgroundImage: data.image
          ? `url(${data.image})`
          : `url('./images/sample.png')`
      }}
    />
    <h4 className={style.header_name}>{data.name}</h4>
    <div className={style.header_actions}>
      <NavLink
        exact
        activeStyle={{ background: "#3B99FC" }}
        to={`/agent/${data.id}`}
      >
        Overview
      </NavLink>
      <NavLink
        exact
        activeStyle={{ background: "#3B99FC" }}
        to={`/agent/${data.id}/about`}
      >
        About
      </NavLink>
      {/* {data.type === "Person" ? (
        <NavLink
          exact
          activeStyle={{ background: "#3B99FC" }}
          to={`/agent/${data.id}/validate`}
        >
          Validate
        </NavLink>
      ) : null} */}
      <NavLink
        exact
        activeStyle={{ background: "#3B99FC" }}
        to={`/agent/${data.id}/inventory`}
      >
        Inventory
      </NavLink>
    </div>
  </div>
);
