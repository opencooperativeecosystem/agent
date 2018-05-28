import React from 'react'
import style from '../index.css'
import Title from '../../title'
// import {Cross, More} from '../../../icons'
import {Icons} from 'oce-components/build'

export default function ModalTitle ({action, toggleActions, close, isVisible, keyword, note, editTitle, toggleVisibility }) {
  return (
      <div className={style.content_header}>
        {isVisible ? '' : <span onClick={toggleVisibility} className={style.title}><Title title={note || 'Add new description...'} /></span>}
        {isVisible ? <input autoFocus onBlur={toggleVisibility} className={style.header_note_input} defaultValue={note} onChange={editTitle} /> : ''}
        <span onClick={close} className={style.closeModal}><Icons.Cross color={'rgba(0,0,0,.3)'} width={24} height={24} /></span>
        <span onClick={toggleActions} className={style.toggleActions}><Icons.More color={'rgba(0,0,0,.3)'} width={24} height={24} /></span>
      </div>
    )
}