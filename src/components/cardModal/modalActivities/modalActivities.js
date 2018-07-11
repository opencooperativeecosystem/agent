import React from 'react'
import style from '../index.css'
import moment from 'moment'
import Button from '../../button'
import {Icons} from 'oce-components/build'

import LogEvent from '../logEvent'
export default function ({param, units, scopeId, commitmentId, idEventToEdit, editEventModal, toggleEditEvent, idEventToDelete, deleteEventModal, toggleDeleteEvent, activities, id, date, deleteEvent, editEvent, loading, error, refetchData}) {
  return (
    <div className={style.activities_list}>
      {loading ? 'loading' : (
        <div>
          <div className={deleteEventModal ? style.delete + ' ' + style.popup : style.delete + ' ' + style.popup + ' ' + style.hidden}>
            <div className={style.popup_header}>
              <h5>Delete Event</h5>
              <span className={style.icon_delete} onClick={() => toggleDeleteEvent(deleteEventModal)}><Icons.Cross width={20} height={20} color={'#999'}/></span>
            </div>
            <div className={style.popup_content}>
              <h5 className={style.content_description}>Are you sure to delete this event?</h5>
              <Button title={'Delete'} action={() => deleteEvent(idEventToDelete)} type={'negate'} />
            </div>
          </div>
          {activities.map((item, i) => (
            <div key={i} className={item}>
              <div className={editEventModal && idEventToEdit === item.fulfilledBy.id ? style.list_item + ' ' + style.hidden : style.list_item}>
                <div className={style.members}>
                  <span className={style.members_item}>
                    <img src={item.fulfilledBy.provider.image} alt={item.fulfilledBy.provider.name} />
                  </span>
                </div>
                <div className={style.item_desc}>
                  <span>{item.fulfilledBy.provider.name}</span> {item.fulfilledBy.action + ' ' + item.fulfilledQuantity.numericValue + ' ' + item.fulfilledQuantity.unit.name } 
                  <div className={style.desc}>{item.fulfilledBy.note} </div>
                </div>
                <div className={style.item_payed}>
                  {item.fulfilledBy.requestDistribution ? <span className={style.desc_payment + ' ' + style.desc_payed}>Payed</span> : <span className={style.desc_payment + ' ' + style.desc_voluntary}>Voluntary</span>}
                </div>
                <div className={style.item_meta}>
                  {moment(item.fulfilledBy.start).format("DD MMM")}
                  <span id={item.id} onClick={() => toggleEditEvent(deleteEventModal, item.fulfilledBy.id)}>-<span className={style.meta_icon}><Icons.Edit2 width='14' height='14' color='#525561' /></span> <i>Edit</i></span>
                  <span id={item.id} onClick={() => toggleDeleteEvent(deleteEventModal, item.fulfilledBy.id)}>-<span className={style.meta_icon}><Icons.Trash width='14' height='14' color='#525561' /></span><i>Delete</i></span>
                </div>
              </div>
              <div className={editEventModal && idEventToEdit === item.fulfilledBy.id ? style.edit_activity : style.edit_activity + ' ' + style.hidden}>
                <div className={style.activity_header}>
                  <h5>Update Event</h5>
                  <span className={style.icon_delete} onClick={() => toggleEditEvent(editEventModal)}><Icons.Cross width={20} height={20} color={'#999'}/></span>
                  <LogEvent previousEvent={item} eventId={item.fulfilledBy.id} param={param} id={id} units={units} scopeId={scopeId} commitmentId={commitmentId} updateEvent toggle={() => toggleEditEvent(editEventModal)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
