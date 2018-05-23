import React from 'react'
import style from './style.css'
import Cards from '../components/cards'
import Feed from '../components/feed/feed'
import { NavLink } from 'react-router-dom'
import Item from '../components/inventoryItem'
import {Icons, Panel, NavigationItem} from 'oce-components/build'
// import Panel from '../components/panel'

const Agent = ({data, match}) => {
  console.log(data)
  console.log(match)
  return (
    <section className={style.agent}>
      <Panel icon={<Icons.Diary width='18' color='#f0f0f0' />} title='Diary'>
        <div className={style.agent_profile}>
          <div className={style.agent_info}>
            <div className={style.info_image}>
              <img className={style.image_photo} src={data.image} />
            </div>
            <h1 className={style.info_title}>{data.name}</h1>
          </div>
          {data.agentEconomicEvents.length > 0
          ? <Feed feed={data.agentEconomicEvents} />
          : <div className={style.emptyBox}>No item in this section :(</div>}
        </div>
      </Panel>
      <Panel icon={<Icons.Card width='18' color='#f0f0f0' />} title='Plans'>
        {data.agentPlans.length > 0
          ? <Cards
            data={data.agentPlans}
            link='/canvas'
          />
          : <div className={style.emptyBox}>No item in this section :(</div>
        }
      </Panel>
      <Panel icon={<Icons.Globe width='18' color='#f0f0f0' />} title='Network'>
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
      <Panel icon={<Icons.Inventory width='18' color='#f0f0f0' />} title='Inventory'>
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
