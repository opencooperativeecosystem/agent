import React from "react";
import { Icons, Panel } from "oce-components/build";
import Cards from "../components/cards";
import style from "./style.css";

const AgentPlans = props => {
  console.log(props)
  return (
    <div className={style.container}>
      <Panel
        icon={<Icons.Card width="18" height="18" color="#f0f0f0" />}
        title="Plans"
      >
        {props.data.agentPlans.length > 0 ? (
          <Cards
            data={props.data.agentPlans}
            link='/canvas'
        />
        ) : (
          <div>No item in this section</div>
        )}
      </Panel>
    </div>
  );
};

export default AgentPlans;
