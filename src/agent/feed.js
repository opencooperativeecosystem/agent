import React from "react";
import style from "./style.css";
import Feed from "../components/feed/feed";
import { Icons, Panel } from "oce-components/build";
import getFeed from "../queries/getFeed";
import { Query } from "react-apollo";
import { LoadingMini, ErrorMini } from "../components/loading";
import { compose, withState, withHandlers } from "recompose";
import setAgentPanel from "../mutations/setAgentPanel";
import { graphql } from "react-apollo";
import getAgentPanel from "../queries/getAgentPanel";

const AgentFeed = ({
  onFeedOptions,
  feedOptions,
  onFeed,
  feed,
  id,
  image,
  setAgent,
  name,
  toggleModal,
  modalIsOpen,
  agentPanel
}) => {
  
  return (
    <Panel
      data-testid="diary"
      icon={<Icons.Diary width="18" height="18" color="#f0f0f0" />}
      title={"Feed"}
    >
      <div>
        <Query
          query={getFeed}
          variables={{
            token: localStorage.getItem("oce_token"),
            id: Number(id)
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
              console.log(data)
            return (
              <div>
                {agentPanel === "info" ? (
                  <div className={style.agent_profile}>
                    <div className={style.agent_info}>
                      {data.viewer.agent.email ? (
                        <h3 className={style.info_email}>
                          {data.viewer.agent.email}
                        </h3>
                      ) : null}
                      {data.viewer.agent.note ? (
                        <h4 className={style.info_note}>
                          {data.viewer.agent.note}
                        </h4>
                      ) : null}
                      {data.viewer.agent.agentSkills.length > 0 ? (
                        <div className={style.info_skills}>
                          <h4 className={style.skills_title}>skills</h4>
                          {data.viewer.agent.agentSkills
                            .slice(0, 3)
                            .map((skill, i) => (
                              <div className={style.skill_item} key={i}>
                                {skill.name}
                              </div>
                            ))}
                          <div
                            onClick={toggleModal}
                            className={style.skill_others}
                          >
                            +{data.viewer.agent.agentSkills.slice(3).length}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                {data.viewer.agent.agentEconomicEvents.length > 0 ? (
                  <Feed feed={data.viewer.agent.agentEconomicEvents} />
                ) : null}
              </div>
            );
          }}
        </Query>
      </div>
    </Panel>
  );
};

export default compose(
  graphql(getAgentPanel, {
    props: ({ ownProps, data }) => ({
      agentPanel: data.agentPanel
    })
  }),
  graphql(setAgentPanel, { name: "setAgentPanelMutation" }),
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withState("feed", "onFeed", ""),
  withState("feedOptions", "handleFeedOptions", false),
  withHandlers({
    onFeedOptions: props => () => {
      props.handleFeedOptions(!props.feedOptions);
    },
    toggleModal: props => () => {
      props.toggleModalIsOpen(!props.modalIsOpen);
    },
    setAgent: props => type => {
      console.log("type");
      console.log(type);
      return props.setAgentPanelMutation({ variables: { type: type } });
    }
  })
)(AgentFeed);
