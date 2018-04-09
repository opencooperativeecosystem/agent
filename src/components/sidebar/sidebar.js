import React from 'react'
import style from './style.css'
import {User, Preferites, Settings, Power, More} from '../../icons'
import {NavLink, withRouter} from 'react-router-dom'

const Sidebar = (props) => {
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
          <div className={style.header_left}>
            <span className={style.logo} />
            <ul className={style.section_list}>
              <li className={style.list_item}><NavLink exact activeClassName={style.active} to={'/'}>Dashboard</NavLink></li>
              <li className={style.list_item}><NavLink activeClassName={style.active} to={'/work'}>Work</NavLink></li>
              <li className={style.list_item}><NavLink activeClassName={style.active} to={'/validate'}>Validate</NavLink></li>
              <li className={style.list_item}><NavLink activeClassName={style.active} to={'/network'}>Network</NavLink></li>
              <li className={style.list_item}><NavLink activeClassName={style.active} to={'/inventory'}>Inventory</NavLink></li>
              <li><a href='https://board.net/p/Fair_Health_Care_v4' target='blank'>Welfare</a></li>
              <li><a target='blank' href="https://wallet.bankofthecommons.coop">Wallet</a></li>
            </ul>
          </div>
          <div className={style.header_menu}>
            <ul className={style.menu_item}>
              <li>
                <a target='blank' href='https://www.opencoopecosystem.net'>Docs</a>
              </li>
              <li>
                <a href='http://fairplayground.info/datasources/editor.php' target='blank' >Stats</a>
              </li>
              <li>
                <a href='https://github.com/opencoopecosystem' target='blank'>Github</a>
              </li>
            </ul>
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
              <span onClick={props.handleToggleProfilePanel}><More onClick={props.handleToggleProfilePanel} color='#222' width='18' height='18' /></span>
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
        {/* <section className={style.sidebar_section}>
          <ul className={style.section_list}>
            <li className={style.list_item}><NavLink exact activeClassName={style.active} to={'/'}>Dashboard</NavLink></li>
            <li className={style.list_item}><NavLink activeClassName={style.active} to={'/work'}>Work</NavLink></li>
            <li className={style.list_item}><NavLink activeClassName={style.active} to={'/validate'}>Validate</NavLink></li>
            <li><a href="https://board.net/p/Fair_Health_Care_v4" target='blank'>Health</a></li>
            <li><a target='blank' href="https://wallet.bankofthecommons.coop">Wallet</a></li>
          </ul>
        </section> */}
      </div>
    </div>
  )
}

export default withRouter(Sidebar)
