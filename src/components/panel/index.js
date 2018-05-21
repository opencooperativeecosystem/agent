import React from 'react'
import style from './style.css'

const Panel = ({icon, title, children}) => (
  <section className={style.panel}>
    <div className={style.panel_content}>
      <div className={style.panel_title}>
        <span className={style.title_icon}>{icon}</span>
        <h1>{title}</h1>
      </div>
      <div className={style.content_children}>
        {children}
      </div>
    </div>
  </section>
)

export default Panel
