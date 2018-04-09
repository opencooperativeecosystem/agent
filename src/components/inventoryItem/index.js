import React from 'react'
import style from './style.css'

const Item = ({item}) => (
  <div className={style.list_item}>
    <div className={style.item_desc}>
      <span>{item.currentQuantity.numericValue + ' ' + item.currentQuantity.unit.name }</span> of <b>{item.resourceClassifiedAs.name}</b>
    </div>
    <div className={style.type}>{item.resourceClassifiedAs.category}</div>
  </div>
)

export default Item
