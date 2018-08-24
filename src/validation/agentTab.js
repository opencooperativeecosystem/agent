import React from "react";
import style from "./style.css";
import { NavLink } from "react-router-dom";
import {compose, withState, withHandlers} from 'recompose'

export default props => {
  let totHours = props.data.events.reduce(function(a, b) {
    return a + b.hours;
  }, 0);
  return (
    <div className={style.tab_agent}>
      <div className={style.agent_info}>
        <div
          className={style.info_image}
          style={{ backgroundImage: `url(${props.data.image})` }}
        />
        <div className={style.info_name}>
          <NavLink to={`/agent/${props.data.id}`}>{props.data.name}</NavLink>
        </div>
      </div>
      <div className={style.tab_contributions}>
        {props.data.events.map((event, i) => {
          return (
            <Contribution key={i} toggleModal={props.toggleModal} event={event} />
          );
        })}
      </div>
      <div className={style.agent_resume}>
        <h4>Tot. {totHours} Hours</h4>
      </div>
    </div>
  );
};

const Contribution = compose(
    withState('isVisible', 'toggleVisibility', false),
    withHandlers({
        onHover: props => (status) => {
            props.toggleVisibility(status)
        }
    })
)(({ toggleModal, event, onHover, isVisible }) => (
  <div className={style.contribution_wrapper}>
      {isVisible ? <Popup event={event}/> : null}
  <div
    onClick={() => toggleModal(event.id)}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    className={
      event.validations === 0
        ? style.contributions_item
        : event.validations === 1
          ? style.contributions_item + " " + style.incompleted
          : style.contributions_item + " " + style.completed
    }
  />
  </div>
));


const Popup = (event) => {
    return (
    <div className={style.popup}>
        <h1>{event.event.hours} hours</h1>
    </div>
)}