import React from "react";
import style from "./style.css";
import { Icons } from "oce-components/build";
import { NavLink } from "react-router-dom";
import CreatePlan from "./createPlan";
import CreatePlanFromRecipe from "./createPlanFromRecipe";

const Sidebar = props => {
  return props.panel ? (
    <div
      className={
        props.panel ? style.sidebar + " " + style.visible : style.sidebar
      }
    >
      <header className={style.sidebar_menu}>
        <span
          className={
            props.panel
              ? style.menu_icon + " " + style.icon_active
              : style.menu_icon
          }
          onClick={() => props.handleTogglePanel()}
        >
          <Icons.Menu color="#99ADC6" width="18" />
        </span>
        <span className={style.menu_icon}>
          <NavLink to={"/"}>
            <Icons.User color="#99ADC6" width="18" />
          </NavLink>
        </span>
        <span className={style.menu_icon}>
          <NavLink to={"/network"}>
            <Icons.Users color="#99ADC6" width="18" />
          </NavLink>
        </span>
        <span className={style.menu_icon}>
          <NavLink to={"/settings"}>
            <Icons.Settings color="#99ADC6" width="18" />
          </NavLink>
        </span>
        <span
          data-testid="log-out"
          onClick={props.logout}
          className={style.menu_icon}
        >
          <Icons.Power color="#99ADC6" width="18" />
        </span>
      </header>
      <div className={style.sidebar_header}>
      <div className={style.sidebar_inner}>
        <div className={style.header_profile}>
          <div className={style.profile_main}>
            <NavLink to={"/"}>
              <div
                className={style.data_image}
                style={{ backgroundImage: `url(${props.data.image})` }}
              />
              <h3 className={style.main_title} data-testid="agent-name">
                {props.data.name}
              </h3>
            </NavLink>
          </div>
        </div>
        {props.isOpen === 'createPlan' ? (
          <CreatePlan history={props.history} togglePopup={props.togglePopup} />
        ) : (
          <div className={style.button_action} onClick={() => props.togglePopup('createPlan')}>
            <span>
              <Icons.Edit2 width="18" height="18" color="#f0f0f0" />
            </span>Create a plan
          </div>
        )}
        {props.isOpen === 'createPlanFromRecipe' ? (
          <CreatePlanFromRecipe history={props.history} togglePopup={props.togglePopup} />
        ) : ( 
          <div
            onClick={() => props.togglePopup('createPlanFromRecipe')}
            className={style.button_action}
          >
            <span>
              <Icons.Copy width="18" height="18" color="#f0f0f0" />
            </span>Create a plan from recipe
          </div>
        )}
        <div className={style.button_action + ' ' + style.underlined}>
          <NavLink to={"/validation"}><span><Icons.Star width='18' height='18' color='#f0f0f0'/></span>Validate</NavLink>
        </div>
        </div>
      </div>
    </div>
  ) : (
    <header
      className={style.sidebar_menu + " " + style.sidebar_menu_collapsed}
    >
      <span
        className={style.menu_icon}
        onClick={() => props.handleTogglePanel()}
      >
        <Icons.Menu color="#99ADC6" width="18" />
      </span>
    </header>
  );
};

export default Sidebar;
