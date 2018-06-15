import React from "react";
import { Icons, Panel, NavigationItem } from "oce-components/build";
import style from "./style.css";
import { NavLink } from "react-router-dom";
import {PropsRoute} from '../helpers/router'
import AgentPlans from '../agentPlans/wrapper'

const AgentRelationships = props => (
    <div className={style.container}>
    <Panel icon={<Icons.Globe width="18" color="#f0f0f0" />} title="Network">
      <div style={{padding: '10px'}}>
        {props.relationships.map((item, i) => (
          <div className={style.container_link} key={i}>
            <NavLink
              activeClassName={style.active}
              to={`${props.match.path}/agent/` + item.object.id}
            >
              <NavigationItem img={item.object.image} title={item.object.name} />
            </NavLink>
          </div>
        ))}
      </div>
    </Panel>
    <PropsRoute path={`${props.match.path}/agent/:id`} component={AgentPlans} />
    </div>
);

export default AgentRelationships;
