import React from 'react'
import style from './style.css'

export default props => (
    <div className={style.legend}>
        <h3>Agents</h3>
        <div className={style.legend_right}>
          <div className={style.legend_item}>
            <span className={style.item_circle} />
            <div className={style.item_title}>non validated</div>
          </div>
          <div className={style.legend_item}>
            <span className={style.item_circle + " " + style.incompleted} />
            <div className={style.item_title}>Incompleted validation</div>
          </div>
          <div className={style.legend_item}>
            <span className={style.item_circle + " " + style.completed} />
            <div className={style.item_title}>Validated</div>
          </div>
        </div>
      </div>
)