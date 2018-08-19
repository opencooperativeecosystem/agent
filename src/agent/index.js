import React from "react";
import style from "./style.css";
import Header from "./header";
import Agent from "./agent";
import { PropsRoute } from "../helpers/router";
import Inventory from '../inventory'
import About from '../about'
// import Validate from '../validate/wrapper'

export default ({ data, match, toggleModal, isOpen }) => {
  return (
    <div className={style.agentWrapper}>
      <Header data={data} />
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
        {/* <PropsRoute
          exact
          path={`${match.path}/validate`}
          component={Validate}
          data={data}
          toggleModal={toggleModal}
          isOpen={isOpen}
          id={data.id}
        /> */}
        <PropsRoute
          exact
          path={`${match.path}/about`}
          component={About}
          data={data}
          toggleModal={toggleModal}
          isOpen={isOpen}
          id={data.id}
        />
    </div>
  );
};

