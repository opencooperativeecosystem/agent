import React from "react";
import style from "./style.css";

export default ({ agents, selectTab, tabId }) => {
    return (
  <div className={style.header}>
    <ul className={style.tabs}>
      {agents.map((agent, i) => (
          <li key={i} onClick={() => selectTab(agent.object.id, agent.object.name)} className={tabId === agent.object.id ? style.tab + ' ' + style.active : style.tab}>
            <h5>{agent.object.name}</h5>
          </li>
      ))}
    </ul>
  </div>
)};


