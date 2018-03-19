import React from 'react'
import style from './style.css'
import {User, Preferites, Settings, Power, More} from '../../icons'
import {NavLink, withRouter} from 'react-router-dom'

const Sidebar = (props) => {
  let result = props.agents.reduce(function (r, a) {
    let type = a.relationship.label.split(' ', 3)[1]
    r[type] = r[type] || []
    r[type].push(a)
    return r
  }, Object.create(null))
  return (
    <div>
      <div className={style.sidebar_mobile + ' ' + style.sidebar_mobile_active}>
        <ul className={style.mobile_links}>
          <li className={style.links_item}>
            <NavLink to={'/'}>
              <span><User width={20} height={20} color={'#fff'}/></span>
              <h5>Profile</h5>
            </NavLink>
          </li>
          <li className={style.links_item}>
            <NavLink to={'/projects'}>
              <span><Preferites width={20} height={20} color={'#fff'}/></span>
              <h5>Projects</h5>
            </NavLink>
          </li>
          <li className={style.links_item}>
            <NavLink to={'/settings'}>
              <span><Settings width={20} height={20} color={'#fff'}/></span>
              <h5>Settings</h5>
            </NavLink>
          </li>
          <li className={style.links_item}>
            <a onClick={props.logout}>
              <span><Power width={20} height={20} color={'#fff'}/></span>
              <h5>Logout</h5>
            </a>
          </li>
        </ul>
      </div>
    <div className={style.sidebar}>
      <header className={style.sidebar_header}>
      <div className={style.header_menu}>
        <div className={style.header_profile}>
          <NavLink to={'/agent/' + props.data.id}>
            <div className={style.data_image}>
              <img src={props.data.image} />
            </div>
            <h3>{props.data.name}</h3>
          </NavLink>
        </div>
        <div className={style.right_profile}>
          {/* <span><Bell width={'16'} height={'16'} color='#fff' /></span> */}
          <span onClick={props.handleToggleProfilePanel}><More onClick={props.handleToggleProfilePanel} color='#fff' width='18' height='18' /></span>
        </div>
        <div className={props.profile ? style.right_profile_panel + ' ' + style.profileActive : style.right_profile_panel }>
          <div className={style.panel_section}>
            <NavLink to={'/'}>Profile</NavLink>
            <NavLink to={'/settings'}>Settings</NavLink>
          </div>
          <button onClick={props.logout} className={style.logout}>Logout</button>
        </div>
        </div>
      </header>
      <section className={style.sidebar_section}>
        <h3 className={style.section_title}>Apps</h3>
        <ul className={style.section_list}>
          <li className={style.list_active}><NavLink to={'/'}>Dashboard</NavLink></li>
          <li className={style.list_active}><NavLink to={'/work'}>Work</NavLink></li>
          <li className={style.list_active}><NavLink to={'/validate'}>Validate</NavLink></li>
          <li><a href="https://board.net/p/Fair_Health_Care_v4" target='blank'>Health</a></li>
          <li><a target='blank' href="https://wallet.bankofthecommons.coop">Wallet</a></li>
        </ul>
      </section>
      <section className={style.aside_section}>
      <h3 className={style.section_title}>Network</h3>
      {Object.keys(result).map((item, i) => (
        <div key={i}>
          <ul className={style.section_list}>
            {result[Object.keys(result)[i]].map((agent, i) => (
              <NavLink key={i} activeClassName={style.activeLink} to={'/agent/' + agent.object.id}>
                <li>
                  <div className={style.list_agent}>
                    <img className={style.agent_photo} src="https://picsum.photos/200/300" />
                    <div className={style.agent_label}>
                      <h4>{agent.object.name}</h4>
                      <h6>{agent.relationship.label.split(' ', 3)[1]}</h6>
                    </div>
                  </div>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      ))}
      </section>
    </div>
    </div>
  )
}

export default withRouter(Sidebar)
