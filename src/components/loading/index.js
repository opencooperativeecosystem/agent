import React from 'react'
import {Icons} from 'oce-components/build'
import style from './style.css'

export const LoadingMini = () => (
    <div className={style.wrapper}>
      <div className={style.wrapperLoader}>
        <span className={style.loaderIcon}><Icons.Loading width="24" height="24" color='#606984' /></span>
        <h1>Loading...</h1>
      </div>
    </div>
)

