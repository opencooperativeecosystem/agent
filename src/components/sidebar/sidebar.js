import React from 'react'
import style from './style.css'
import {Icons, Input, Textarea, Button} from 'oce-components/build'
import DatePicker from 'react-datepicker'
import {Form, Field} from 'formik'
import Alert from '../alert'
import {NavLink} from 'react-router-dom'
require("react-datepicker/dist/react-datepicker-cssmodules.css")

const StartDate = (props) => {
  const handleChange = value => {
    props.onChange('start', value);
  };
  return (
    <div>
      <DatePicker
      selected={props.value}
      onChange={handleChange}
      dateFormatCalendar={'DD MMM YYYY'}
      withPortal
    />
    {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}

const DueDate = (props) => {
  const handleChange = value => {
    props.onChange('due', value);
  };
  return (
    <div>
    <DatePicker
      selected={props.value}
      onChange={handleChange}
      dateFormatCalendar={'DD MMM YYYY'}
      withPortal
    />
    {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}

const Sidebar = (props) => {
  return (
    props.panel
    ? <div className={props.panel ? style.sidebar + ' ' + style.visible : style.sidebar}>
      <header className={style.sidebar_menu}>
        <span className={props.panel ? style.menu_icon + ' ' + style.icon_active : style.menu_icon} onClick={() => props.handleTogglePanel()}><Icons.Menu color='#99ADC6' width='18' /></span>
        <span className={style.menu_icon}><NavLink to={'/'}><Icons.User color='#99ADC6' width='18' /></NavLink></span>
        <span className={style.menu_icon}><NavLink to={'/settings'}><Icons.Settings color='#99ADC6' width='18' /></NavLink></span>
        <span onClick={props.logout} className={style.menu_icon}><Icons.Power color='#99ADC6' width='18' /></span>
      </header>
      <div className={style.sidebar_header}>
        <div className={style.header_profile}>
          <NavLink to={'/'}>
            <div className={style.data_image}>
              <img alt='profile' src={props.data.image} />
            </div>
            <h3>{props.data.name}</h3>
          </NavLink>
        </div>
        <div className={style.section_planCreation}>
        <h4 className={style.planCreation_title}>Create a new plan</h4>
        <Form>
          <div className={style.form_input}>
            <Field name="name" render={({ field /* _form */ }) => (<Input type={'dark'} {...field} placeholder='Type the plan name' />)} />
            {props.errors.name && props.touched.name && <Alert>{props.errors.name}</Alert>}
          </div>
          <div className={style.formPlanWrapper}>
          <div className={style.form_note}>
            <Field name="note" render={({ field /* _form */ }) => (<Textarea {...field} placeholder='What is the plan about' />)} />
          </div>
          <div className={style.dates}>
            <div className={style.dateWrapper}>
              <h5 className={style.dateName}><span style={{verticalAlign: 'sub'}}><Icons.Calendar width='16' height='16' color='#707BA0' /></span> Start</h5>
              <StartDate
                value={props.values.start}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
                error={props.errors.start}
                touched={props.touched.start}
              />
            </div>
            <div className={style.dateWrapper}>
              <h5 className={style.dateName}><span style={{verticalAlign: 'sub'}}><Icons.Calendar width='16' height='16' color='#707BA0' /></span> Due</h5>
              <DueDate
                value={props.values.due}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
                error={props.errors.due}
                touched={props.touched.due}
              />
            </div>
          </div>
          </div>
          <div className={style.form_button}>
            <Button>Create Plan</Button>
          </div>
          </Form>
        </div>
        {/* <ul className={style.section_list}>
          <li className={style.list_item}><NavLink exact activeClassName={style.active} to={'/'}>Dashboard</NavLink></li>
          <li className={style.list_item}><NavLink activeClassName={style.active} to={'/plans'}>Plans</NavLink></li>
          <li className={style.list_item}><NavLink activeClassName={style.active} to={'/wallet'}>Wallet</NavLink></li>
          {/* <li className={style.list_item}><NavLink activeClassName={style.active} to={'/network'}>Network</NavLink></li> */}
          {/* <li className={style.list_item}><a href='http://fairplayground.info/datasources/editor.php' target='blank' >Stats</a></li>
          <li><a href='https://board.net/p/Fair_Health_Care_v4' target='blank'>Welfare</a></li>
        </ul> */}
      </div>
    </div>
    : <header className={style.sidebar_menu + ' ' + style.sidebar_menu_collapsed}>
      <span className={style.menu_icon} onClick={() => props.handleTogglePanel()}><Icons.Menu color='#99ADC6' width='18' /></span>
    </header>
  )
}

export default Sidebar
