import React from "react";
import style from "./style.css";
import Header from "./header";
import Agent from "./agent";
import { PropsRoute } from "../helpers/router";
import Inventory from '../inventory'
export default ({ data, match, toggleModal, isOpen }) => {
  console.log(match)
  return (
    <div>
      <Header data={data} />
      <section className={style.agent}>
        <PropsRoute
          exact
          path={match.path}
          component={Agent}
          data={data}
          toggleModal={toggleModal}
          isOpen={isOpen}
          id={data.id}
        />
        <PropsRoute
          exact
          path={`${match.path}/inventory`}
          component={Inventory}
          data={data}
          toggleModal={toggleModal}
          isOpen={isOpen}
          id={data.id}
        />
      </section>
    </div>
  );
};

