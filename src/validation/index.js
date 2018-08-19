import React from "react";
import style from "./style.css";
import { Icons } from "oce-components/build";
import AgentTab from "./agentTab";
import Overview from "./overview";
import Legend from "./legend";
import { Query } from "react-apollo";
import { LoadingMini, ErrorMini } from "../components/loading";
import getClaims from "../queries/getClaims";
export default props => {
  return (
    <Query
      query={getClaims}
      variables={{
        token: localStorage.getItem("oce_token"),
        id: Number(props.tabId)
      }}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return <LoadingMini />;
        if (error)
          return (
            <ErrorMini refetch={refetch} message={`Error! ${error.message}`} />
          );
        console.log(data);
        // [
        //     {
        //         id: 123,
        //         name: 'bob',
        //         events: [
        //             {
        //                 id: 456
        //                 validations: []
        //             }
        //         ]

        //     }
        // ]
        let agentsArray = [];
        data.viewer.agent.agentPlans.map(plan =>
          plan.planProcesses.map(process =>
            process.committedInputs.map(input =>
              input.fulfilledBy.map(event =>
                agentsArray.push({
                  id: event.fulfilledBy.provider.id,
                  name: event.fulfilledBy.provider.name,
                  image: event.fulfilledBy.provider.image,
                  events: []
                })
              )
            )
          )
        );
        function removeDuplicates(myArr, prop) {
          return agentsArray.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
          });
        }
        let uniqueAgents = removeDuplicates(agentsArray, "id");
        uniqueAgents.map((agent, i) =>
          data.viewer.agent.agentPlans.map(plan =>
            plan.planProcesses.map(process =>
              process.committedInputs.map(input => {
                input.fulfilledBy
                  .filter(event => event.fulfilledBy.provider.id === agent.id)
                  .map(item =>
                    uniqueAgents[i].events.push({
                      hours: item.fulfilledBy.affectedQuantity.numericValue,
                      validations: item.fulfilledBy.validations.length
                    })
                  );
              })
            )
          )
        );
        console.log(uniqueAgents);
        return (
          <div>
            <Overview data={data} />
            <Legend />
            <div className={style.validationTab}>
              {uniqueAgents.map((agent, i) => (
                <AgentTab key={i} data={agent} />
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
};
