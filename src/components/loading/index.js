import React from 'react'
import {Icons, Button} from 'oce-components/build'
import style from './style.css'

export const LoadingMini = () => (
    <div className={style.wrapper}>
      <div className={style.wrapperLoader}>
        <span className={style.loaderIcon}><Icons.Loading width="24" height="24" color='#606984' /></span>
        <h1>Loading...</h1>
      </div>
    </div>
)


export const ErrorMini = ({message, loading, refetch}) => (
    <div className={style.wrapper_error}>
        <div><Icons.Cross width='26' height='26' color='#f0f0f0a3' /></div>
        <h1>{message}</h1>
        {loading ? <Button disabled>Wait...</Button> : <Button onClick={() => refetch()}>Refresh</Button>}
    </div>
)

