import React from "react";
import style from "./style.css";
import { Icons } from "oce-components/build";

const Menu = ({ toggleActivePanel, active }) => (
  <div className={style.settings_menu}>
    <div
      onClick={() => toggleActivePanel("general")}
      className={
        active === "general"
          ? style.menu_item + " " + style.active
          : style.menu_item
      }
    >
      <span>
        <Icons.User
          width="18"
          height="18"
          color={active === "general" ? "#f0f0f0" : "#99ADC6"}
        />
      </span>
      General
    </div>
    <div
      onClick={() => toggleActivePanel("notification")}
      className={
        active === "notification"
          ? style.menu_item + " " + style.active
          : style.menu_item
      }
    >
      <span>
        <Icons.Bell
          width="18"
          height="18"
          color={active === "notification" ? "#f0f0f0" : "#99ADC6"}
        />
      </span>
      Notifications
    </div>
    <div
      onClick={() => toggleActivePanel("skills")}
      className={
        active === "skills"
          ? style.menu_item + " " + style.active
          : style.menu_item
      }
    >
      <span>
        <Icons.Star
          width="18"
          height="18"
          color={active === "skills" ? "#f0f0f0" : "#99ADC6"}
        />
      </span>
      Skills
    </div>
    <div
      onClick={() => toggleActivePanel("recipes")}
      className={
        active === "recipes"
          ? style.menu_item + " " + style.active
          : style.menu_item
      }
    >
      <span>
        <Icons.Folder
          width="18"
          height="18"
          color={active === "recipes" ? "#f0f0f0" : "#99ADC6"}
        />
      </span>
      Recipes <i>(Coming soon)</i>
    </div>
    <div
      onClick={() => toggleActivePanel("credentials")}
      className={
        active === "credentials"
          ? style.menu_item + " " + style.active
          : style.menu_item
      }
    >
      <span>
        <Icons.Lock
          width="18"
          height="18"
          color={active === "credentials" ? "#f0f0f0" : "#99ADC6"}
        />
      </span>
      Credentials <i>(Coming soon)</i>
    </div>
  </div>
);

export default Menu;
