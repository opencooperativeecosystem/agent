import React from 'react'
import style from './style.css'

 export default ({skills}) => {
    return (
    <div>
        <h2>Your skills - {skills.length}</h2>
        <div>
        {skills.map((skill, i) => (
            <div className={style.skill_item} key={i}>
            {skill.name}
            </div>
        ))}
        </div>
    </div>
)}
