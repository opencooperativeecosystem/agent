import React from 'react'
import {Panel, Icons, Input, Select, Textarea, Button} from 'oce-components/build'
import style from './style.css'
import DatePicker from 'react-datepicker'
require("react-datepicker/dist/react-datepicker-cssmodules.css")

// ROUTES
const Plan = (props) => {
  return (
    <div className={style.container}>
      <Panel icon={<Icons.Globe width='18' color='#f0f0f0' />} title='Create new plan'>
        <div className={style.panel_container}>
          <span className={style.form_select}>
            <Select dark >
              {props.agentData.data.agentRelationships.map((rel, i) => (
                <option value={rel.object.id} key={i}>{rel.object.name}</option>
              ))}
            </Select>
          </span>
          <span className={style.form_input}>
            <Input dark placeholder='Type the plan name' onChange={props.updateName} />
          </span>
          <span className={style.form_note}>
            <Textarea placeholder='What is the plan about' onChange={props.updateNote} />
          </span>
          <div className={style.dates}>
            <div className={style.item_date}>
              <h5>Start date</h5>
              <DatePicker
                selected={props.start}
                onChange={props.updateStart}
                dateFormatCalendar={'DD MMM YYYY'}
              />
            </div>
            <div className={style.item_date}>
              <h5>Due date</h5>
              <DatePicker
                selected={props.due}
                onChange={props.updateDue}
                dateFormatCalendar={'DD MMM YYYY'}
              />
            </div>
          </div>
          <div className={style.form_button}>
            <Button onClick={() => props.createPlan()}>Create</Button>
          </div>
        </div>
      </Panel>
    </div>
  )
}

export default Plan
