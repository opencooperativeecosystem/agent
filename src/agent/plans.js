import React from "react";
import style from "./style.css";
import Cards from "../components/cards";
import { Icons, Panel } from "oce-components/build";
import getActivePlan from "../queries/getPlans";
import getAllPlans from "../queries/getAllPlans";
import getFinishedPlans from "../queries/getFinishedPlans";
import { Query } from "react-apollo";
import { LoadingMini, ErrorMini } from "../components/loading";
import {compose, withState, withHandlers } from "recompose";


const PlanOptions = ({ onPlanQuery }) => (
  <form className={style.settingsModal}>
    <div className={style.settingsModal_item}>
      <div className={style.item_option}>
        <input
          id="active"
          type="radio"
          name="plans"
          defaultChecked
          onChange={() => onPlanQuery("Active")}
        />
        <label htmlFor="active">Show only active plans</label>
      </div>
    </div>
    <div className={style.settingsModal_item}>
      <div className={style.item_option}>
        <input
          id="all"
          type="radio"
          name="plans"
          onChange={() => onPlanQuery("All")}
        />
        <label htmlFor="all">Show all plans</label>
      </div>
    </div>
    <div className={style.settingsModal_item}>
      <div className={style.item_option}>
        <input
          id="closed"
          type="radio"
          name="plans"
          onChange={() => onPlanQuery("Closed")}
        />
        <label htmlFor="closed">Show only closed plans</label>
      </div>
    </div>
  </form>
);

const AgentPlans = ({
  onPlanOptions,
  planOptions,
  onPlanQuery,
  planQuery,
  id
}) => {
  let query
  if (planQuery === 'All') {
    query = getAllPlans
  } else if (planQuery === 'Closed') {
    query = getFinishedPlans
  } else {
    query = getActivePlan
  }
  return (
    <Panel
      data-testid="plans"
      icon={<Icons.Card width="18" color="#f0f0f0" />}
      title={"Plans (" + planQuery + ")"}
      actions={
        <span
          onClick={onPlanOptions}
          className={planOptions ? style.hightlighted + ' ' + style.planOptionsSpan : style.planOptionsSpan}
        >
          <Icons.Settings width="18" height="18" color="#99ADC6" />
        </span>
      }
    >
      <div>
        {planOptions ? <PlanOptions onPlanQuery={onPlanQuery} /> : null}
        <Query
          query={query}
          variables={{
            token: localStorage.getItem("oce_token"),
            id: Number(id)
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <LoadingMini />;
            if (error) return <ErrorMini loading={loading} refetch={refetch} message={`Error! ${error.message}`} />;
            return (
              <div>
                {data.viewer.agent.agentPlans.length > 0 ? (
                  <Cards data={data.viewer.agent.agentPlans} link="/canvas" />
                ) : (
                  <div className={style.emptyBox}>No plans</div>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    </Panel>
  );
};

export default compose(
    withState('planQuery', 'onPlanQuery', 'Active'),
    withState('planOptions', 'handlePlanOptions', false),
    withHandlers({
      onPlanOptions: props => () => {
        props.handlePlanOptions(!props.planOptions)
      }
    })
  )(AgentPlans);
  