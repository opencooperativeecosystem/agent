import React from "react";
import style from "./index.css";
import moment from "moment";
import { NavLink } from 'react-router-dom'
export default function({ feed }) {
console.log(feed)
  return (
    <div className={style.activities_list}>
      {feed.map((item, i) => (
        <div key={i} className={style.list_item}>
          <div className={style.members}>
            <span className={style.members_item}>
              <span
                style={{
                  backgroundImage: item.provider
                    ? `url(${item.provider.image})`
                    : ""
                }}
              />
            </span>
          </div>
          <div className={style.item_desc}>
            {item.provider ? <span><NavLink to={`/agent/${item.provider.id}`}>{item.provider.name}</NavLink></span> : null}
            {" " + item.action + " " + item.affectedQuantity.numericValue + " "} <i>of</i> {item
              .affectedQuantity.unit
              ? item.affectedQuantity.unit.name
              : ""}
            <div className={style.desc}>{item.note}</div>
            <div className={style.item_meta}>
              {moment(item.start).format("DD MMM")} -{" "}
              {item.requestDistribution ? (
                <span className={style.desc_payment + " " + style.desc_payed}>
                  Payed
                </span>
              ) : (
                <span
                  className={style.desc_payment + " " + style.desc_voluntary}
                >
                  Voluntary
                </span>
              )} -{" "}
              {item.receiver ? 
              <span className={style.receiver}>{item.receiver.name}</span>
              : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
