import React from "react";
import style from "./style.css";
import Feed from '../components/feed/feed'
import { Icons, Panel } from "oce-components/build";
import getFeed from "../queries/getFeed";
import { Query } from "react-apollo";
import { LoadingMini } from "../components/loading";
import { compose, withState, withHandlers } from "recompose";

const PlanOptions = ({ onFeed }) => (
  <form className={style.settingsModal}>
    <div className={style.settingsModal_item}>
      <div className={style.item_option}>
        <input
          id="feed"
          type="radio"
          defaultChecked
          name="feed"
          onChange={() => onFeed("feed")}
        />
        <label htmlFor="feed">Show only feed</label>
      </div>
    </div>
    <div className={style.settingsModal_item}>
      <div className={style.item_option}>
        <input
          id="info"
          type="radio"
          name="feed"
          onChange={() => onFeed("info")}
        />
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
  name,
  toggleModal
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
      icon={
        <div
          className={style.info_image}
          style={{
            backgroundImage: image
              ? `url(${image})`
              : `url('./images/sample.png')`
          }}
        />
      }
      title={name}
    >
      <div>
        {feedOptions ? <PlanOptions onFeed={onFeed} /> : null}
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
                {feed === "info" ? (
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
              </div>
            );
          }}
        </Query>
      </div>
    </Panel>
  );
};

export default compose(
  withState("feed", "onFeed", ""),
  withState("feedOptions", "handleFeedOptions", false),
  withHandlers({
    onFeedOptions: props => () => {
      props.handleFeedOptions(!props.feedOptions);
    }
  })
)(AgentFeed);
