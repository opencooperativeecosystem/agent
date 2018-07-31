import React from "react";
import style from "./style.css";
import Feed from '../components/feed/feed'
import { Icons, Panel } from "oce-components/build";
import getFeed from "../queries/getFeed";
import { Query } from "react-apollo";
import { LoadingMini } from "../components/loading";
import { compose, withState, withHandlers } from "recompose";
import SkillsModal from "../components/skillsModal";
import setAgentPanel from '../mutations/setAgentPanel'
import {graphql} from 'react-apollo'
import getAgentPanel from '../queries/getAgentPanel'

const PlanOptions = ({ onFeed, setAgent, agentPanel }) => (
  <form className={style.settingsModal}>
    <div className={style.settingsModal_item}>
      <div className={style.item_option}>
        {agentPanel === 'feed'
        ? <input
        id="feed"
        type="radio"
        name="feed"
        value='feed'
        checked={true}
        onChange={() => setAgent("feed")}
        />
        :<input
        id="feed"
        type="radio"
        name="feed"
        value='feed'
        checked={false}
        onChange={() => setAgent("feed")}
      />
        }
        <label htmlFor="feed">Show only feed</label>
      </div>
    </div>
    <div className={style.settingsModal_item}>
      <div className={style.item_option}>
       {agentPanel === 'info'
        ? <input
        id="info"
        type="radio"
        name="feed"
        checked={true}
        onChange={() => setAgent("info")}
      /> 
        : <input
        id="info"
        type="radio"
        name="feed"
        checked={false}
        onChange={() => setAgent("info")}
      /> 
       }
        
        <label htmlFor="info">Show Info</label>
      </div>
    </div>
  </form>
);

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
      actions={
        <span
          onClick={onFeedOptions}
          className={
            feedOptions
              ? style.hightlighted + " " + style.planOptionsSpan
              : style.planOptionsSpan
          }
        >
          <Icons.Settings width="18" height="18" color="#99ADC6" />
        </span>
      }
      icon={<Icons.Diary width='18' height='18' color='#f0f0f0' />}
      title={'Feed'}
    >
      <div>
        {feedOptions ? <PlanOptions agentPanel={agentPanel} setAgent={setAgent} onFeed={onFeed} /> : null}
        <Query
          query={getFeed}
          variables={{
            token: localStorage.getItem("oce_token"),
            id: Number(id)
          }}
        >
          {({ loading, error, data }) => {

            if (loading) return <LoadingMini />;
            if (error) return `Error! ${error.message}`;
            return (
              <div>
                {agentPanel === "info" ? (
                  <div className={style.agent_profile}>
                    <div className={style.agent_info}>
                      {data.viewer.agent.email ? (
                        <h3 className={style.info_email}>{data.viewer.agent.email}</h3>
                      ) : null}
                      {data.viewer.agent.note ? (
                        <h4 className={style.info_note}>{data.viewer.agent.note}</h4>
                      ) : null}
                      {data.viewer.agent.agentSkills.length > 0 ? (
                        <div className={style.info_skills}>
                          <h4 className={style.skills_title}>skills</h4>
                          {data.viewer.agent.agentSkills.slice(0, 3).map((skill, i) => (
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
                <SkillsModal isOpen={modalIsOpen} toggleModal={toggleModal} skills={data.viewer.agent.agentSkills}/>
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
  })}),
  graphql(setAgentPanel, {name: 'setAgentPanelMutation'}),
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withState("feed", "onFeed", ""),
  withState("feedOptions", "handleFeedOptions", false),
  withHandlers({
    onFeedOptions: props => () => {
      props.handleFeedOptions(!props.feedOptions);
    },
    toggleModal: props => () => {
      props.toggleModalIsOpen(!props.modalIsOpen)
    },
    setAgent: props => (type) => {
      console.log('type')
      console.log(type)
      return props.setAgentPanelMutation({variables: {type: type}})
    }
  }),
)(AgentFeed);
