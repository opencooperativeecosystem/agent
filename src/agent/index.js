import React from 'react'
import style from './style.css'
import Cards from '../components/cards'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Feed from '../components/feed/feed'
import { NavLink } from 'react-router-dom'
import Item from '../components/inventoryItem'
const Agent = ({data}) => {
  return (
    <section className={style.agent}>
      <Tabs selectedTabClassName={style.list_active}>
      <div className={style.agent_sidebar_wrapper}>
        <div className={style.agent_sidebar}>
          <h1>sections</h1>
          <ul className={style.sidebar_panel}>
            <TabList className={style.scope_list}>
              <Tab>Diary</Tab>
              <Tab>Plans</Tab>
              <Tab>Wallet</Tab>
              <Tab>Welfare</Tab>
              <Tab>Network</Tab>
              <Tab>Inventory</Tab>
            </TabList>
          </ul>
        </div>
      </div>
      <div className={style.agent_profile}>
        <div className={style.agent_info}>
          <div className={style.info_data}>
            <h1 className={style.info_title}>
              <span className={style.info_image}>
              <img className={style.image_photo} src={data.image} />
            </span>
            {data.name}</h1>
            <h5 className={style.info_note}>{data.note}</h5>
          </div>
        </div>
        <div className={style.section}>
        <div className={style.section_wrapper}>
        <TabPanel>
          <h5 className={style.wrapper_subtitle}>Diary</h5>
          {data.agentEconomicEvents.length > 0
          ? <Feed feed={data.agentEconomicEvents} />
          : <div className={style.emptyBox}>No item in this section :(</div>}
        </TabPanel>
          <TabPanel>
            <h5 className={style.wrapper_subtitle}>Plans</h5>
            {data.agentPlans.length > 0
            ? <Cards
              data={data.agentPlans}
              link='work/canvas'
            />
            : <div className={style.emptyBox}>No item in this section :(</div>}
          </TabPanel>
          <TabPanel>
          <h5 className={style.wrapper_subtitle}>Wallet</h5>
          <div className={style.emptyBox}>Under construction</div>
        </TabPanel>
          <TabPanel>
          <h5 className={style.wrapper_subtitle}>Welfare</h5>
          <div className={style.emptyBox}>Under construction</div>
        </TabPanel>
          <TabPanel>
          <h5 className={style.wrapper_subtitle}>Network</h5>
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
          </TabPanel>
          <TabPanel>
          <h5 className={style.wrapper_subtitle}>Inventory</h5>
          <div className={style.resources_list}>
              {data.ownedEconomicResources.length > 0
                ? data.ownedEconomicResources.map((item, i) => (
                  <Item item={item} key={i} />
                ))
              : <div className={style.emptyBox}>No item in this section :(</div>
              }
            </div>
          </TabPanel>
          </div>
      </div>
    </div>
    </Tabs>
  </section>
  )
}

export default Agent
