import React from 'react'
import style from './style.css'

const Card = () => {
    return (
      <div className={style.lists_item}>
          <h4 className={style.item_title}>Faircoin</h4>
          <h5 className={style.item_value}>100.00</h5>
          <div className={style.item_meta}>
              <a href="#">Open in wallet</a>
          </div>
      </div>
    )
}

export default Card
