import React from 'react'
import Feed from "./feed";
import { Icons, Panel, Participant } from "oce-components/build";
import { NavLink } from "react-router-dom";
// import Item from '../components/inventoryItem'
import Plans from "./plans";
import style from "./style.css";

export default ({ data, toggleModal, isOpen }) => (
    <div className={style.agent}>
      <Feed
          image={data.image}
          name={data.name}
          id={data.id}
          toggleModal={toggleModal}
        />
        <Panel
          data-testid="network"
          icon={<Icons.Globe width="18" color="#f0f0f0" />}
          title={data.type === "Person" ? "Network" : "Participants"}
        >
          <div className={style.agent_list}>
            {data.type === "Person"
              ? data.agentRelationships.map((item, i) => (
                  <NavLink
                    key={i}
                    activeClassName={style.activeLink}
                    to={"/agent/" + item.object.id}
                  >
                    <Participant
                      img={item.object.image}
                      title={item.object.name}
                    />
                  </NavLink>
                ))
              : data.agentRelationships.map((item, i) => (
                  <NavLink
                    key={i}
                    activeClassName={style.activeLink}
                    to={"/agent/" + item.subject.id}
                  >
                    <Participant
                      img={item.subject.image}
                      title={item.subject.name}
                    />
                  </NavLink>
                ))}
          </div>
        </Panel>
        <Plans id={data.id} />
    </div>
)