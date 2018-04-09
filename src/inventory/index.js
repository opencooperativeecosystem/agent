import React from 'react'
import style from './style.css'
import Item from '../components/inventoryItem'

const Network = ({data}) => (
    <section className={style.agent}>
      <div className={style.agent_profile}>
        <div className={style.agent_info}>
          <div className={style.info_data}>
            <h1 className={style.info_title}>Inventory</h1>
            <h5 className={style.info_note}>Internet Advertising Trends You Won T Be Disappointed Internet Advertising Trends You Won T Be Disappointed</h5>
          </div>
        </div>
        <div className={style.section}>
        <div className={style.section_wrapper}>
            {data.ownedEconomicResources.map((item, i) => (
              <Item item={item} key={i} />
            ))}
        </div>
      </div>
    </div>
  </section>
)

export default Network
