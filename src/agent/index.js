import React from 'react'
import style from './style.css'
import { NavLink } from 'react-router-dom'
// import Item from '../components/inventoryItem'
import Plans from './plans'
import Feed from './feed'
import {Icons, Panel, NavigationItem} from 'oce-components/build'

const Agent = ({data, toggleModal, isOpen}) => {
  return (
    <section className={style.agent}>
      <Feed image={data.image} name={data.name} id={data.id} toggleModal={toggleModal} />
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
