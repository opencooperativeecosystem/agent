import React from "react";
import { Query } from "react-apollo";
import Component from "./inventory";
import InventoryQuery from "../queries/getInventory";
import { Panel, Icons } from "oce-components/build";
import { LoadingMini } from "../components/loading";
import style from "./style.css";

export default props => (
  <Query
    query={InventoryQuery}
    variables={{
      token: localStorage.getItem("oce_token"),
      id: Number(props.match.params.id)
    }}
  >
    {({ loading, error, data }) => {
      if (loading) return <LoadingMini />;
      if (error) return "error";
      return (
        <div className={style.wrapper}>
          <Panel
            large
            icon={<Icons.Globe width="18" color="#f0f0f0" />}
            title={"Inventory"}
          >
            <Component data={data} />
          </Panel>
        </div>
      );
    }}
  </Query>
);
