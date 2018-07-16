import React from 'react'
import style from './style.css'
import Feed from '../components/feed/feed'
import { NavLink } from 'react-router-dom'
import Item from '../components/inventoryItem'
import PanelPlans from './plans'
import {Icons, Panel, NavigationItem} from 'oce-components/build'

const Agent = ({data}) => {
  return (
    <section className={style.agent}>
      <Panel data-testid='diary' icon={<Icons.Diary width='18' color='#f0f0f0' />} title='Diary'>
        <div className={style.agent_profile}>
          <div className={style.agent_info}>
            <div className={style.info_image}>
              <span className={style.image_photo} style={{backgroundImage: data.image ? `url(${data.image})` : `url('./images/sample.png')`}} />
            </div>
            <h1 className={style.info_title}>{data.name}</h1>
          </div>
          {data.agentEconomicEvents.length > 0
          ? <Feed feed={data.agentEconomicEvents} />
          : <div className={style.emptyBox}>No item in this section :(</div>}
        </div>
      </Panel>
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
      <PanelPlans id={data.id} />
      <Panel data-testid='inventory' icon={<Icons.Inventory width='18' color='#f0f0f0' />} title='Inventory'>
        <div className={style.resources_list}>
          {data.ownedEconomicResources.length > 0
            ? data.ownedEconomicResources.map((item, i) => (
              <Item item={item} key={i} />
            ))
          : <div className={style.emptyBox}>No item in this section :(</div>
          }
        </div>
      </Panel>
    </section>
  )
}

export default Agent
