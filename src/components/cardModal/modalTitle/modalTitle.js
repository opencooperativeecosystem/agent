import React from 'react'
import style from '../index.css'
import Title from '../../title'
// import {Cross, More} from '../../../icons'
import {Icons} from 'oce-components/build'

export default function ModalTitle ({action, unit, amount, resource }) {
  return (
      <div className={style.content_header}>
        <span className={style.header_icons}><Icons.Text width='20' width='20' color='#999'/></span>
        <h1 className={style.title}>{action + ' ' + amount + ' ' + unit}<span>of</span>{resource}</h1>
      </div>
    )
}