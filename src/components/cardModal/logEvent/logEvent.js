import React from 'react'
import style from '../index.css'
import Button from '../../button'
import TextArea from '../../textarea'
import DatePicker from 'react-datepicker'
import ToggleButton from 'react-toggle-button'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker-cssmodules.css')

export default function LogEvent ({previousEvent, updateEvent, eventId, update, toggle, units, requestPayment, startDate, addPayment, addDate, commitmentId, scopeId, log, note, addNote, addAction, addNumericValue, numericValue, addUnitId}) {
    return (
    <div className={style.content_module}>
        <div className={style.content_log}>
            <div className={style.log_item}>
            <div className={style.item_sencence}>
                <select onChange={addAction}>
                    <option value='work'>Work</option>
                    <option value='cite'>Cite</option>
                    <option value='consume'>Consume</option>
                    <option value='use'>Use</option>
                </select>
                <input onChange={addNumericValue} type='number' name='Unit' min='00.00' max='100.00' step='0.1' placeholder={previousEvent ? previousEvent.fulfilledQuantity.numericValue : '00.00'} />
                <select onChange={addUnitId} className={style.type} defaultValue='2'>
                  {units.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
                </select>
                <div className={style.item_date}>
                    <DatePicker
                      selected={previousEvent ? moment(previousEvent.fulfilledBy.start) : startDate}
                      onChange={addDate}
                      dateFormatCalendar={'DD MMM YYYY'}
                    />
                </div>
            </div>
                <div className={style.item_distribution}>
                    <ToggleButton
                      value={requestPayment}
                      onToggle={(value) => addPayment(value)} />
                    <label>Request payment</label>
                </div>
                <TextArea action={addNote} placeholder={previousEvent ? previousEvent.fulfilledBy.note : 'Add a more detailed description...'} />
                {updateEvent
                ? <div className={style.event_actions}>
                  <Button action={update} type={'good'} title='Update Event' />
                  <Button action={toggle} type={'evil'} title='Close' />
                </div>
                : <Button action={log} type={'good'} title='Log Event' />
                }
            </div>
        </div>
    </div>
  )
}
