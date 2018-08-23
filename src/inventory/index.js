import React from "react";
import { Query } from "react-apollo";
import Component from "./inventory";
import InventoryQuery from "../queries/getInventory";
import { Panel, Icons, Button } from "oce-components/build";
import { LoadingMini, ErrorMini } from "../components/loading";
import style from "./style.css";
import InventoryModal from "../components/inventoryModal/wrapper";
import { compose, withState, withHandlers } from "recompose";

const Wrapper = props => (
  <Query
    query={InventoryQuery}
    variables={{
      token: localStorage.getItem("oce_token"),
      id: Number(props.match.params.id)
    }}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <LoadingMini />;
      if (error)
        return (
          <ErrorMini
            refetch={refetch}
            message={`Error! ${error.message}`}
          />
        );
      return (
        <div className={style.wrapper}>
          <Panel
            large
            icon={<Icons.Globe width="18" color="#f0f0f0" />}
            title={"Inventory"}
            actions={<Button onClick={props.toggleModal} className={style.inventory_action}>Add new resource</Button>}
          >
            <Component data={data} />
          </Panel>
          <InventoryModal
            modalIsOpen={props.modalIsOpen}
            closeModal={props.toggleModal}
            toggleModal={props.toggleModal}
          />
        </div>
      );
    }}
  </Query>
);


export default compose(
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withHandlers({
    toggleModal: props => () => {
      props.toggleModalIsOpen(!props.modalIsOpen)
    }
  })
)(Wrapper);
