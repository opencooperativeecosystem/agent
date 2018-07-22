import React from 'react'
import style from './style.css'
// import Feed from '../components/feed/feed'
import { NavLink } from 'react-router-dom'
import Item from '../components/inventoryItem'
import Plans from './plans'
import Feed from './feed'
import {Icons, Panel, NavigationItem} from 'oce-components/build'

const Agent = ({data, toggleModal, isOpen}) => {
  return (
    <section className={style.agent}>
      <Feed image={data.image} name={data.name} id={data.id} toggleModal={toggleModal} />
      {/* <Panel data-testid='diary' icon={<div className={style.info_image} style={{backgroundImage: data.image ? `url(${data.image})` : `url('./images/sample.png')`}} />} title={data.name}>
        <div className={style.agent_profile}>
          <div className={style.agent_info}>
            {data.email ? <h3 className={style.info_email}>{data.email}</h3> : null}
            {data.note ? <h4 className={style.info_note}>{data.note}</h4> : null}
            {data.agentSkills.length > 0 ? 
            <div className={style.info_skills}>
            <h4 className={style.skills_title}>skills</h4>
              {data.agentSkills.slice(0,3).map((skill, i) => (
                <div className={style.skill_item} key={i}>{skill.name}</div>
              ))}
              <div onClick={toggleModal} className={style.skill_others}>+{data.agentSkills.slice(3).length}</div>
            </div>  
            : null}
          </div>
          {data.agentEconomicEvents.length > 0 ? <Feed feed={data.agentEconomicEvents} /> : null }
        </div>
      </Panel> */}
      <Panel data-testid='network' icon={<Icons.Globe width='18' color='#f0f0f0' />} title={data.type === 'Person' ? 'Network' : 'Participants'}>
        <div className={style.agent_list}>
          {data.type === 'Person' 
          ? data.agentRelationships.map((item, i) => (
            <NavLink key={i} activeClassName={style.activeLink} to={'/agent/' + item.object.id}>
              <NavigationItem img={item.object.image} title={item.object.name} />
            </NavLink>
          ))
          : data.agentRelationships.map((item, i) => (
            <NavLink key={i} activeClassName={style.activeLink} to={'/agent/' + item.subject.id}>
              <NavigationItem img={item.subject.image} title={item.subject.name} />
            </NavLink>
          )) }
          
        </div>
      </Panel>
      <Plans id={data.id} />
      {/* <Panel data-testid='inventory' icon={<Icons.Inventory width='18' color='#f0f0f0' />} title='Inventory'>
        <div className={style.resources_list}>
          {data.ownedEconomicResources.length > 0
            ? data.ownedEconomicResources.map((item, i) => (
              <Item item={item} key={i} />
            ))
          : <div className={style.emptyBox}>No item in this section :(</div>
          }
        </div>
      </Panel> */}
    </section>
  )
}

export default Agent
