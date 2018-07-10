import React from 'react'
import style from '../index.css'
import {Button} from 'oce-components/build'
import TextArea from '../../textarea'
import DatePicker from 'react-datepicker'
import ToggleButton from 'react-toggle-button'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker-cssmodules.css')

export default function LogEvent ({previousEvent, updateEvent, update, toggle, units, requestPayment, startDate, addPayment, addDate, log, addNote, addAction, addNumericValue, addUnitId, option}) {    
    return (
    <div className={style.content_module}>
        <h5 className={style.modalDescription_title}>Log your work</h5>
        <div className={style.content_log}>
            <div className={style.log_item}>
            <div className={style.item_sencence}>
                {/* <select onChange={addAction}>
                    <option value={option}>{option}</option>
                </select> */}
                <h5 className={style.sentence_action}>{option}</h5>
                <input className={style.action_input_amount }onChange={addNumericValue} type='number' name='Unit' min='00.00' max='100.00' step='0.1' placeholder={previousEvent ? previousEvent.fulfilledQuantity.numericValue : '00.00'} />
                <h5 className={style.sentence_action}>Hours</h5>
                {/* <select onChange={addUnitId} className={style.type} defaultValue='2'>
                  {units.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                </select> */}
                <div className={style.item_date}>
                    <DatePicker
                      selected={previousEvent ? moment(previousEvent.fulfilledBy.start) : startDate}
                      onChange={addDate}
                      dateFormat={'DD MMM'}
                      withPortal
                    />
                </div>
            </div>
                
                <TextArea action={addNote} value={previousEvent || ''} placeholder={'Add a more detailed description...'} />
                <div className={style.item_publishActions}>
                {updateEvent
                ? <div className={style.event_actions}>
                  <Button onClick={update} type={'good'}>Update Event</Button>
                  <Button onClick={toggle} type={'evil'}>Close</Button>
                </div>
                : <Button onClick={log} type={'good'}>Publish</Button>
                }
                <div className={style.item_distribution}>
                    <ToggleButton
                      value={requestPayment}
                      onToggle={(value) => addPayment(value)} />
                    <label>Request payment</label>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
