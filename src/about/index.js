import React from "react";
import { Panel, Icons } from "oce-components/build";
import style from "./style.css";
import { Query } from "react-apollo";
import getAbout from "../queries/getAbout";
import { LoadingMini } from "../components/loading";

export default props => (
  <Query
    query={getAbout}
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
          icon={<Icons.User width="18" color="#f0f0f0" />}
          title={"About"}
        >
          <div className={style.inventory_canvas}>
            <div
              className={style.canvas_image}
              style={{ backgroundImage: `url(${data.viewer.agent.image})` }}
            />
            <div className={style.canvas_container}>
              <h1 className={style.canvas_title}>{data.viewer.agent.name}</h1>
              <h5 className={style.canvas_description}>
                {data.viewer.agent.note}
              </h5>
              <div className={style.canvas_options}>
                <div className={style.options_item}>
                  <h5>Type</h5>
                  <h4>{data.viewer.agent.type}</h4>
                </div>
                
                <div className={style.options_item}>
                  <h5>email</h5>
                  <h4>{data.viewer.agent.email}</h4>
                </div>
                {data.viewer.agent.primaryLocation ? (
                  <div className={style.options_item}>
                    <h5>Location</h5>
                    <h4>{data.viewer.agent.primaryLocation.name}</h4>
                  </div>
                ) : null}
                <div className={style.skills}>
                  <h5>Skills</h5>
                  <div>
                    {data.viewer.agent.agentSkills.map((skill, i) => (
                        <div className={style.skill_item} key={i}>
                        {skill.name}
                        </div>
                    ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>
        </div>
      );
    }}
  </Query>
);
