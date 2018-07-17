import React from "react";
import style from "./style.css";
import ToggleButton from "react-toggle-button";
import { graphql } from "react-apollo";
import updateNotification from "../mutations/updateNotification";
import deleteNotification from "../mutations/deleteNotification";
import { withHandlers, compose } from "recompose";
import {Icons} from 'oce-components/build'

const Notifications = ({ toggleNotification, notifications }) => (
  <div>
    <h2>Notifications</h2>
    {notifications.map((notification, i) => (
      <div key={i} className={style.form_item + " " + style.form_setting}>
        <div className={style.item_info}>
          <h5>{notification.display}</h5>
          <p>{notification.description}</p>
        </div>
        <div className={style.item_status}>
          <ToggleButton
            value={notification.value || false}
            onToggle={value =>
              toggleNotification(
                notification.id,
                value,
                notification.originalId
              )
            }
          />
        </div>
      </div>
    ))}
  </div>
);

export default compose(
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withHandlers({
    toggleNotification: props => (id, value, notificationId) => {
      if (id !== undefined) {
        return props
          .mutateNotification({
            variables: {
              send: !value,
              id: id,
              token: localStorage.getItem("oce_token")
            }
          })
          .then(
            data => {
              props
                .updateNotification({
                  variables: {
                    message: (
                      <div style={{ fontSize: "14px" }}>
                        <span
                          style={{ marginRight: "10px", verticalAlign: "sub" }}
                        >
                          <Icons.Bell width="18" height="18" color="white" />
                        </span>General settings updated successfully!
                      </div>
                    ),
                    type: "success"
                  }
                })
                .then(res => {
                  setTimeout(() => {
                    props.deleteNotification({
                      variables: { id: res.data.addNotification.id }
                    });
                  }, 1000);
                });
            },
            e => {
              const errors = e.graphQLErrors.map(error => error.message);
              props
                .updateNotification({
                  variables: {
                    message: (
                      <div style={{ fontSize: "14px" }}>
                        <span
                          style={{ marginRight: "10px", verticalAlign: "sub" }}
                        >
                          <Icons.Cross width="18" height="18" color="white" />
                        </span>
                        {errors}
                      </div>
                    ),
                    type: "alert"
                  }
                })
                .then(res => {
                  setTimeout(() => {
                    props.deleteNotification({
                      variables: { id: res.data.addNotification.id }
                    });
                  }, 1000);
                });
            }
          );
      } else {
        return props
          .createNotification({
            variables: {
              agentId: props.data.id,
              send: !value,
              notificationTypeId: notificationId,
              token: localStorage.getItem("oce_token")
            }
          })
          .then(
            data => {
              props
                .updateNotification({
                  variables: {
                    message: (
                      <div style={{ fontSize: "14px" }}>
                        <span
                          style={{ marginRight: "10px", verticalAlign: "sub" }}
                        >
                          <Icons.Bell width="18" height="18" color="white" />
                        </span>General settings updated successfully!
                      </div>
                    ),
                    type: "success"
                  }
                })
                .then(res => {
                  setTimeout(() => {
                    props.deleteNotification({
                      variables: { id: res.data.addNotification.id }
                    });
                  }, 1000);
                });
            },
            e => {
              const errors = e.graphQLErrors.map(error => error.message);
              props
                .updateNotification({
                  variables: {
                    message: (
                      <div style={{ fontSize: "14px" }}>
                        <span
                          style={{ marginRight: "10px", verticalAlign: "sub" }}
                        >
                          <Icons.Cross width="18" height="18" color="white" />
                        </span>
                        {errors}
                      </div>
                    ),
                    type: "alert"
                  }
                })
                .then(res => {
                  setTimeout(() => {
                    props.deleteNotification({
                      variables: { id: res.data.addNotification.id }
                    });
                  }, 1000);
                });
            }
          );
      }
    }
  })
)(Notifications);
