import React from 'react'
import style from '../index.css'
import Title from '../../title'
// import {Cross, More} from '../../../icons'
import {Icons} from 'oce-components/build'

export default function ModalTitle ({action, toggleActions, close, isVisible, keyword, note, editTitle, toggleVisibility }) {
  return (
      <div className={style.content_header}>
        <span className={style.header_icons}><Icons.Text width='20' width='20' color='#999'/></span>
        <span onClick={toggleVisibility} className={style.title}><Title title={note || 'Add new description...'} /></span>
        {/* <span onClick={toggleActions} className={style.toggleActions}><Icons.More color={'rgba(0,0,0,.3)'} width={24} height={24} /></span> */}
      </div>
    )
}