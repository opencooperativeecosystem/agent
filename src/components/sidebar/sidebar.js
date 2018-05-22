import React from 'react'
import style from './style.css'
import {User, Menu, Settings, Power, More} from '../../icons'
import {NavLink, withRouter} from 'react-router-dom'

const Sidebar = (props) => {
  return (
    <div className={style.sidebar}>
      <header className={style.sidebar_menu}>
        <span className={style.menu_icon}><Menu color='#99ADC6' width='18' /></span>
        <span className={style.menu_icon}><NavLink to={'/'}><User color='#99ADC6' width='18' /></NavLink></span>
        <span className={style.menu_icon}><NavLink to={'/settings'}><Settings color='#99ADC6' width='18' /></NavLink></span>
        <span onClick={props.logout} className={style.menu_icon}><Power color='#99ADC6' width='18' /></span>
      </header>
      <div className={style.sidebar_header}>
        <div className={style.header_profile}>
          <NavLink to={'/'}>
            <div className={style.data_image}>
              <img src={props.data.image} />
            </div>
            <h3>{props.data.name}</h3>
          </NavLink>
        </div>
        <ul className={style.section_list}>
          <li className={style.list_item}><NavLink exact activeClassName={style.active} to={'/'}>Dashboard</NavLink></li>
          <li className={style.list_item}><NavLink activeClassName={style.active} to={'/plan'}>Plan</NavLink></li>
          <li className={style.list_item}><NavLink activeClassName={style.active} to={'/work'}>Work</NavLink></li>
          <li className={style.list_item}><NavLink activeClassName={style.active} to={'/validate'}>Validate</NavLink></li>
          <li className={style.list_item}><NavLink activeClassName={style.active} to={'/network'}>Network</NavLink></li>
          <li className={style.list_item}><a href='http://fairplayground.info/datasources/editor.php' target='blank' >Stats</a></li>
          <li><a href='https://board.net/p/Fair_Health_Care_v4' target='blank'>Welfare</a></li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Sidebar)
