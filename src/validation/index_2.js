import React from "react";
import style from "./style.css";
import { Icons } from "oce-components/build";
import moment from "moment";

const Canvas = props => {
  const { data, param } = props;
  return (
    <div className={style.canvas_board}>
      {data.map(plan =>
        plan.planProcesses.map(process =>
          process.committedInputs.map(input =>
            input.fulfilledBy
              .filter(fullf => fullf.fulfilledBy.provider.id === param)
              .map((event, o) => (
                <SingleValidation
                  deleteValidation={props.deleteValidation}
                  myId={props.myAgentId}
                  createValidation={props.createValidation}
                  key={o}
                  style={style}
                  event={event.fulfilledBy}
                />
              ))
          )
        )
      )}
    </div>
  );
};

const SingleValidation = ({
  style,
  event,
  createValidation,
  deleteValidation,
  myId
}) => {
  let button;
  if (
    event.validations.findIndex(
      item => Number(item.validatedBy.id) === Number(myId)
    ) === -1 &&
    event.validations.length >= 2
  ) {
    button = "";
  } else if (event.provider.id === myId) {
    button = "";
  } else if (
    event.validations.some(item => Number(item.validatedBy.id) === Number(myId))
  ) {
    let itemValidated = event.validations.find(
      item => Number(item.validatedBy.id) === Number(myId)
    );
    button = (
      <button
        className={style.actions_validate + " " + style.actions_unvalidate}
        onClick={() => deleteValidation(itemValidated.id)}
      >
        Cancel validation
      </button>
    );
  } else {
    button = (
      <button
        className={style.actions_validate}
        onClick={() => createValidation(event.id)}
      >
        Validate
      </button>
    );
  }
  return (
    <div className={style.list_item}>
      <div className={style.item_info}>
        <div className={style.event_info}>
          <div className={style.infos_title}>
            <img alt="provider" src={event.provider.image} />
            <h3>
              <b>{event.provider.name}</b> {event.action}{" "}
              <b>
                {event.affectedQuantity.numericValue +
                  " " +
                  event.affectedQuantity.unit.name}
              </b>{" "}
              in process: <b>{event.inputOf.name}</b>
            </h3>
          </div>
          <div className={style.info_description}>
            <p>{event.note}</p>
          </div>
          <div className={style.event_secondary}>
            <span>{moment(event.start).format("DD MMM")}</span>
          </div>
        </div>
        <div className={style.buttonRight}>{button}</div>
      </div>
      <div className={style.info_validation}>
        {event.validations
          ? event.validations.map((val, i) => (
              <div key={i} className={style.validation_item}>
                <span>
                  <Icons.Check width="18" height="18" color="#00875A" />
                </span>{" "}
                {val.validatedBy.name} validated{" "}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Canvas;
