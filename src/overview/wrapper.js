import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'


const Overview = (props) => {
  console.log(props)
  return (
    <section className={style.overview}>
      <h1>This page is still under costruction 🍆</h1>
      <h5>Go to <Link to={'/work'}>do some work</Link> or to <Link to={'/validate'}>validate some.</Link></h5>
    </section>
  )
}

export default Overview
