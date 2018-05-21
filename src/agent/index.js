import React from 'react'
import style from './style.css'
import Cards from '../components/cards'
import Feed from '../components/feed/feed'
import { NavLink } from 'react-router-dom'
import Item from '../components/inventoryItem'
import {Menu} from '../icons'
import Panel from '../components/panel'

const Agent = ({data}) => {
  return (
    <section className={style.agent}>
      <Panel icon={<Menu width='18' color='#f0f0f0' />} title='Diary'>
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
      <Panel icon={<Menu width='18' color='#f0f0f0' />} title='Plans'>
        {data.agentPlans.length > 0
          ? <Cards
            data={data.agentPlans}
            link='work/canvas'
          />
          : <div className={style.emptyBox}>No item in this section :(</div>
        }
      </Panel>
      <Panel icon={<Menu width='18' color='#f0f0f0' />} title='Network'>
        <div className={style.agent_list}>
          {data.agentRelationships.map((item, i) => (
            <div key={i} className={style.list_item + ' ' + style.item_member}>
              {data.type !== 'Person'
                ? <NavLink key={i} activeClassName={style.activeLink} to={'/agent/' + item.subject.id}>
                  <div className={style.item_photo}><img src={item.subject.image} /></div>
                  <h5>{item.subject.name}</h5>
                </NavLink>
                : <NavLink key={i} activeClassName={style.activeLink} to={'/agent/' + item.object.id}>
                    <div className={style.item_photo}><img src={item.object.image} /></div>
                    <h5>{item.object.name}</h5>
                </NavLink>}
            </div>
          ))}
        </div>
      </Panel>
      <Panel icon={<Menu width='18' color='#f0f0f0' />} title='Inventory'>
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
