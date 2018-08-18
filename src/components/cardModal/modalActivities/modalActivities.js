import React from "react";
import style from "../index.css";
import moment from "moment";
import { Icons, Button } from "oce-components/build";
import { LoadingMini } from "../../loading";

import LogEvent from "./editWrapper";

export default function({
  param,
  setFieldValue,
  errors,
  touched,
  setFieldTouched,
  values,
  units,
  scopeId,
  commitmentId,
  idEventToEdit,
  editEventModal,
  toggleEditEvent,
  idEventToDelete,
  deleteEventModal,
  toggleDeleteEvent,
  activities,
  id,
  date,
  deleteEvent,
  editEvent,
  loading,
  error,
  refetchData
}) {
  console.log(error)
  return (
    <div className={style.activities_list}>
      {loading ? (
        <LoadingMini />
      ) : (
        <div>
          <div
            className={
              deleteEventModal
                ? style.delete + " " + style.popup
                : style.delete + " " + style.popup + " " + style.hidden
            }
          >
            <div className={style.popup_header}>
              <h5>Delete Event</h5>
              <span
                className={style.icon_delete}
                onClick={() => toggleDeleteEvent(deleteEventModal)}
              >
                <Icons.Cross width={20} height={20} color={"#999"} />
              </span>
            </div>
            <div className={style.popup_content}>
              <h5 className={style.content_description}>
                Are you sure to delete this event?
              </h5>
              <Button onClick={() => deleteEvent(idEventToDelete)} primary>
                Delete
              </Button>
            </div>
          </div>
          {activities.map((item, i) => (
            <div key={i} className={style.item}>
              {editEventModal && idEventToEdit === item.fulfilledBy.id ? (
                <div className={style.popup_activity}>
                  <div className={style.activity_header}>
                    <span
                      className={style.icon_delete}
                      onClick={() => toggleEditEvent(editEventModal)}
                    >
                      <Icons.Cross width={20} height={20} color={"#999"} />
                    </span>
                  </div>
                  <div className={style.activity_body}>
                    <LogEvent
                      note={item.fulfilledBy.note}
                      unitValue={item.fulfilledQuantity.numericValue}
                      unitId={item.fulfilledQuantity.unit.id}
                      action={item.fulfilledBy.action}
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}

                      toggleEditEvent={toggleEditEvent}
                      editEventModal={editEventModal} 
                      idEventToEdit={idEventToEdit}

                      setFieldTouched={setFieldTouched}
                      units={units}
                      unit={item.fulfilledQuantity.unit.name}
                      date={item.fulfilledBy.start}
                      scopeId={scopeId}
                      commitmentId={commitmentId}
                      requestPayment={item.fulfilledBy.requestDistribution}
                    />
                  </div>
                </div>
              ) : (
                <div className={style.list_item}>
                  <div className={style.members}>
                    <span className={style.members_item}>
                      <img
                        src={item.fulfilledBy.provider.image}
                        alt={item.fulfilledBy.provider.name}
                      />
                    </span>
                  </div>
                  <div className={style.item_desc}>
                    <span>{item.fulfilledBy.provider.name}</span>{" "}
                    {item.fulfilledBy.action +
                      " " +
                      item.fulfilledQuantity.numericValue +
                      " " +
                      item.fulfilledQuantity.unit.name}
                    <div className={style.desc}>{item.fulfilledBy.note} </div>
                  </div>
                  <div className={style.item_payed}>
                    {item.fulfilledBy.requestDistribution ? (
                      <span
                        className={style.desc_payment + " " + style.desc_payed}
                      >
                        Payed
                      </span>
                    ) : (
                      <span
                        className={
                          style.desc_payment + " " + style.desc_voluntary
                        }
                      >
                        Voluntary
                      </span>
                    )}
                  </div>
                  <div className={style.item_meta}>
                    {moment(item.fulfilledBy.start).format("DD MMM")}
                    <span
                      id={item.id}
                      onClick={() =>
                        toggleEditEvent(deleteEventModal, item.fulfilledBy.id)
                      }
                    >
                      -<span className={style.meta_icon}>
                        <Icons.Edit2 width="14" height="14" color="#525561" />
                      </span>{" "}
                      <i>Edit</i>
                    </span>
                    <span
                      id={item.id}
                      onClick={() =>
                        toggleDeleteEvent(deleteEventModal, item.fulfilledBy.id)
                      }
                    >
                      -<span className={style.meta_icon}>
                        <Icons.Trash width="14" height="14" color="#525561" />
                      </span>
                      <i>Delete</i>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
