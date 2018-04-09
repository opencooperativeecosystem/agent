import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const Network = ({data, orgs}) => (
    <section className={style.agent}>
      <Tabs selectedTabClassName={style.list_active}>
      <div className={style.agent_sidebar_wrapper}>
        <div className={style.agent_sidebar}>
          <h1>sections</h1>
          <ul className={style.sidebar_panel}>
            <TabList className={style.scope_list}>
              <Tab>Your network</Tab>
              <Tab>Broader network</Tab>
            </TabList>
          </ul>
        </div>
      </div>
      <div className={style.agent_profile}>
        <div className={style.agent_info}>
          <div className={style.info_data}>
            <h1 className={style.info_title}>Network</h1>
            <h5 className={style.info_note}>Internet Advertising Trends You Won T Be Disappointed Internet Advertising Trends You Won T Be Disappointed</h5>
          </div>
        </div>
        <div className={style.section}>
        <div className={style.section_wrapper}>
        <TabPanel>
            {data.agentRelationships.map((item, i) => (
              <div key={i} className={style.item}>
                <Link to={'agent/' + item.object.id}>
                    <div className={style.item_photo}>
                        <img src={item.object.image} /> 
                    </div>
                    <div className={style.item_info}>
                        <h3>{item.object.name}</h3>
                        <h5>{item.object.note}</h5>
                    </div>
                </Link>
              </div>
            ))}
          </TabPanel>
          <TabPanel>
          {orgs.map((item, i) => (
              <div key={i} className={style.item}>
                <Link to={'agent/' + item.id}>
                    <div className={style.item_photo}>
                        <img src={item.image} /> 
                    </div>
                    <div className={style.item_info}>
                        <h3>{item.name}</h3>
                        <h5>{item.note}</h5>
                    </div>
                </Link>
              </div>
            ))}
          </TabPanel>
        </div>
      </div>
    </div>
    </Tabs>
  </section>
)

export default Network
