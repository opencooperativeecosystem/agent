import * as React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import style from "./style.css";
import { withRouter } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { compose, withHandlers, withState } from "recompose";
import Canvas from "../../canvas/wrapper";
import Settings from "../../settings/wrapper";
import Agent from "../../agent/wrapper";
import Overview from "../../overview/wrapper";
import { PropsRoute } from "../../helpers/router";
import PlanOverview from "../../planOverview/wrapper";
import Validation from "../../validation/wrapper";
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";
import { LoadingMini, ErrorMini } from "../../components/loading";
import Network from "../../network/wrapper";

const AppTemplate = props => {
  return props.loading ? (
    <LoadingMini />
  ) : props.error ? (
    <div className={style.errorWrapper}>
      <ErrorMini
        refetch={props.refetch}
        message={`Error! ${props.error.message}`}
      />
    </div>
  ) : (
    <div className={style.surface}>
      <div className={style.content}>
        <div className={style.boards}>
          <div className={style.columnsArea}>
            <Sidebar
              handleTogglePanel={props.handleTogglePanel}
              panel={props.panel}
              data={props.data}
              agents={props.data.agentRelationships}
              history={props.history}
            />
            <PropsRoute
              exact
              path={props.match.path}
              component={Overview}
              id={props.data.id}
            />
            <PropsRoute path="/agent/:id" component={Agent} data={props} />
            <PropsRoute path="/validation" component={Validation} data={props} />
            <PropsRoute path="/network" component={Network} data={props} />
            <PropsRoute
              exact
              path="/canvas/:id"
              component={Canvas}
              relationships={props.data.agentRelationships}
              agentId={props.data.id}
            />
            <PropsRoute
              path="/canvas/:id/overview"
              component={PlanOverview}
              relationships={props.data.agentRelationships}
            />
            <PropsRoute
              exact
              path="/settings"
              component={Settings}
              id={props.data.id}
              name={props.data.name}
              image={props.data.image}
              note={props.data.note}
              email={props.data.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const agentPlans = gql`
  query($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        name
        image
        agentPlans {
          id
        }
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
            image
            agentRecipes {
              id
              name
            }
          }
        }
      }
    }
  }
`;
const App = withRouter(AppTemplate);

export default compose(
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  graphql(agentPlans, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token")
      }
    }),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading,
      error,
      refetch,
      data: viewer ? viewer.myAgent : null
    })
  }),
  withState("panel", "togglePanel", true),
  withHandlers({
    handleTogglePanel: props => event => {
      props.togglePanel(!props.panel);
    }
  })
)(App);
