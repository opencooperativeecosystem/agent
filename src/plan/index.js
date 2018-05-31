import React from 'react'
import {Panel, Icons, Input, Select, Textarea, Button} from 'oce-components/build'
import AgentRelationships from '../agentRelationships'
import style from './style.css'
import DatePicker from 'react-datepicker'
require("react-datepicker/dist/react-datepicker-cssmodules.css")

// ROUTES
const Plan = (props) => {
  return (
    <div className={style.container}>
      <Panel icon={<Icons.Globe width='18' color='#f0f0f0' />} title='Create new plan'>
        <div className={style.panel_container}>
          <span className={style.form_input}>
            <Input dark placeholder='Type the plan name' action={props.updateName} />
          </span>
          <span className={style.form_note}>
            <Textarea placeholder='What is the plan about' action={props.updateNote} />
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
      <AgentRelationships match={props.match} relationships={props.relationships} />
    </div>
  )
}

export default Plan
