import React from 'react'
import style from './index.css'
import moment from 'moment'

export default function ({feed}) {
  return (
    <div className={style.activities_list}>
      {feed.map((item, i) => (
          <div key={i} className={style.list_item}>
            <div className={style.members}>
              <span className={style.members_item}>
                <img src={item.provider.image} />
              </span>
            </div>
            <div className={style.item_desc}>
              <span>{item.provider.name}</span> {item.action + ' ' + item.affectedQuantity.numericValue + ' '} {item.affectedQuantity.unit ? item.affectedQuantity.unit.name : ''} {item.requestDistribution ? <span className={style.desc_payment + ' ' + style.desc_payed}>Payed</span> : <span className={style.desc_payment + ' ' + style.desc_voluntary}>Voluntary</span>}
              <div className={style.desc}>{item.note}</div>
              <div className={style.item_meta}>{moment(item.start.replace(/-/g , ", ")).fromNow()}</div>
            </div>
          </div>
        ))}
    </div>
  )
}
