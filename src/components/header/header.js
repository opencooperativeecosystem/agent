import React from 'react'
import style from './style.css'
import {Left, Right, Card} from '../../icons'
import {withRouter, Link} from 'react-router'

const Header = (props) => {
    return (
        <div className={style.header}>
            <div className={style.header_left}>
                <div className={style.panel_navigation}>
                    <span onClick={() => props.history.goBack()}><Left width={18} height={18} color={'#fff'} /></span>
                    <span onClick={()=> props.history.goForward()}><Right width={18} height={18} color={'#fff'} /></span>
                </div>
                <div className={style.header_plans} onClick={props.handleTogglePanel}>
                    <h5><span className={style.plans_icon}><Card color={'#fff'} width={16} height={16} /></span>All Plans</h5>
                </div>
                <div className={props.panel ? style.header_panel + ' ' + style.active : style.header_panel}>
                    <h3 className={style.panel_title}>Your plans</h3>
                    <div className={style.panel_list}>
                        {props.info.agentPlans.map(plan => (
                        <Link key={plan.id} to={'/canvas/' + plan.id}>
                            <div className={style.list_item}>
                                <h5 className={style.item_title}>{plan.name || plan.planProcesses[0].name}</h5>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
            <h1 className={style.header_title}><Link to={'/'}><span className={style.logo}>
                Kanban{/* <Kanban color1={'#2C4251'} color2={'#5AAC44'} color3={'#D36135'}/> */}
            </span></Link></h1>
            <div className={style.header_right}>
            {/* <div className={style.right_info}>
                    <span className={style.info_img} />
                </div> */}
                <div onClick={props.handleToggleProfilePanel} className={style.right_profile}>
                    <img src={props.info.image} className={style.profile_img} />
                </div>
                <div className={props.profile ? style.right_profile_panel + ' ' + style.profileActive : style.right_profile_panel }>
                    <h3 className={style.right_profile_panel_title}>{props.info.name}</h3>
                    <button onClick={props.logout} className={style.logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)
