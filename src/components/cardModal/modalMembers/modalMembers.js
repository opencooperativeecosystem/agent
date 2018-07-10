import React from 'react'
import style from '../index.css'
import {Icons} from 'oce-components/build'

export default function ModalMembers ({members}) {
  return (
    <div>
      <div className={style.labels_members}>
        <span className={style.members_icon}><Icons.Users width='20' height='20' color='#8D8D8D' /></span>
        {members.map((member, i) => (
          <div key={i} className={style.members}>
            <span className={style.members_item}>
              <img src={member.image} alt={member.name} />
            </span>
          </div>
        )
        )}
      </div>
    </div>
  )
}
