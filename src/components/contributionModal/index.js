import React from "react";
import { Button, Icons } from "oce-components/build";
import moment from "moment";
import style from "./style.css";
import { Query } from "react-apollo";
import { LoadingMini, ErrorMini } from "../loading";
import GetEvent from "../../queries/getEvent";
import { NavLink } from "react-router-dom";

export default ({
  handleEvent,
  handleResource,
  setFieldValue,
  setFieldTouched,
  setSubmitting,
  errors,
  touched,
  values,
  client,
  resources,
  units,
  contributionId,
  createValidation,
  deleteValidation,
  myId,
  note,
  handleChange
}) => {
  return (
    <Query
      query={GetEvent}
      variables={{
        token: localStorage.getItem("oce_token"),
        id: Number(contributionId)
      }}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return <LoadingMini />;
        if (error)
          return (
            <ErrorMini refetch={refetch} message={`Error! ${error.message}`} />
          );
        return (
            <div style={{ padding: "16px", paddingBottom: 0, marginBottom: "-20px" }}>
              <h1 className={style.commTitle}>Validate a contribution</h1>
              <div className={style.firstLine}>
                <div className={style.sentence}>
                  <div
                    className={style.sentence_photo}
                    style={{
                      backgroundImage: `url(${
                        data.viewer.economicEvent.provider.image
                      })`
                    }}
                  />
                  <div className={style.sentence_text}>
                    <NavLink
                      to={`/agent/${data.viewer.economicEvent.provider.id}`}
                    >
                      {data.viewer.economicEvent.provider.name}
                    </NavLink>{" "}
                    {data.viewer.economicEvent.action}{" "}
                    <b>
                      {data.viewer.economicEvent.affectedQuantity.numericValue +
                        " " +
                        data.viewer.economicEvent.affectedQuantity.unit.name}
                    </b>{" "}
                    <i>of</i> {data.viewer.economicEvent.inputOf.name}
                  </div>
                </div>
                <div className={style.date}>
                  {moment(data.viewer.economicEvent.start).format("DD MMM")}
                </div>
              </div>
              <div className={style.note}>{data.viewer.economicEvent.note}</div>

              {data.viewer.economicEvent.inputOf.processPlan ? (
                <div className={style.plan}>
                  <NavLink
                    to={`/canvas/${
                      data.viewer.economicEvent.inputOf.processPlan.id
                    }`}
                  >
                    {data.viewer.economicEvent.inputOf.processPlan.name}
                  </NavLink>
                </div>
              ) : null}

              <div className={style.validations}>
                {data.viewer.economicEvent.validations.map((val, i) => {
                    return (
                  <div key={i} className={style.validations_item}>
                    <div className={style.validations_main}>
                      <span className={style.icon}>
                        <Icons.Check width="18" height="18" color="#36B37E" />
                      </span>
                      <div className={style.main_name}>
                        {val.validatedBy.name} validated
                      </div>
                    </div>
                    <div className={style.validations_note}>
                      {val.note}
                    </div>
                    {Number(val.validatedBy.id) === Number(myId)
                    ? 
                    <Button onClick={() => deleteValidation(data.viewer.economicEvent.id, val.id)}><span><Icons.Trash width='18' height='18' color='#f0f0f0' /></span>Delete validation</Button>
                    : null}
                  </div>
                )})}
              </div>
              {data.viewer.economicEvent.validations.findIndex(
                item => Number(item.validatedBy.id) === Number(myId)
              ) !== -1 ? null : data.viewer.economicEvent.validations.length >=
              2 ? null : data.viewer.economicEvent.provider.id ===
              myId ? null : (
                <div>
                  <div
                    className={style.textareaWrapper}
                    style={{
                      height: "100px",
                      marginTop: "0px",
                      marginBottom: "0px"
                    }}
                  >
                   {note}
                  </div>

                  <div className={style.footer}>
                    <Button
                      onClick={() =>
                        createValidation(data.viewer.economicEvent.id)
                      }
                    >
                      Validate
                    </Button>
                  </div>
                </div>
              )}
            </div>
        );
      }}
    </Query>
  );
};
