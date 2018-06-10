import React from "react";
import styled from "styled-components";
import {clearFix} from 'polished'
import {Icons} from 'oce-components/build'
import style from './style.css'

const Modal = ({ isOpen, toggleModal, content, children }) => {
  return isOpen ? (
    <div className={style.Wrapper}>
      <div className={style.Background} onClick={toggleModal} />
      <div className={style.Dialog}>
        <div className={style.Actions}>
          <div className={style.Close} onClick={toggleModal}><Icons.Cross width='20' height='20' color='#333' /></div>
        </div>
        <div className={style.Content}>
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
