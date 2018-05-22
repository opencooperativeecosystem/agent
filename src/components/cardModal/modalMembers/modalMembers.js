import React from 'react'
import style from '../index.css'
import {Users} from '../../../icons'

export default function ModalMembers ({provider, editProvider, allPlanAgents, members, toggleVisibility, isVisible, onMember}) {
  // const membersName = members.map(m => m.name)
  return (
    <div>
      {/* <div className={style.labels_members + ' ' + style.member_provider}>
        <span ><Shield width={20} height={20} /></span>
        {provider ? <div className={style.members}>
          <span className={style.members_item}>
            <img src={provider.image} alt={provider.name} />
          </span>
        </div> : ''}
        {provider === null
        ? <div className={style.members}>
            <span className={style.members_item} onClick={toggleVisibility}>
              <i><Plus width={16} height={16} color={'#333C44'} /></i>
            </span>
            {isVisible
              ? <div className={style.members + ' ' + style.popup}>
                <div className={style.popup_header}>
                  <h5>Add Task Responsible</h5>
                  <span className={style.icon_delete} onClick={toggleVisibility}><Cross width={20} height={20} color={'#999'}/></span>
                </div>
                <div className={style.popup_content}>
                  <div className={style.content_list}>
                    {allPlanAgents.map((member, i) => (
                      <div key={i} className={style.list_item}>
                        <div className={style.item_click} id={member.id} onClickCapture={editProvider} />
                        <div className={style.members}>
                          <span className={style.members_item}>
                            <img src={member.image} />
                          </span>
                        </div>
                        <h5 className={style.members_name}>{member.name}</h5>
                        {membersName.indexOf(member.name) !== -1 ? <span  className={style.members_active}><span><Check width={14} height={14} color={'#fff'}/></span></span> : ''}
                      </div>
                    )
                    )}
                  </div>
                </div>
              </div> : ''}
          </div>
        : ''
        }
      </div> */}
      <div className={style.labels_members}>
        <div className={style.members_title}>
          <h4>Agents Involved</h4>
        </div>
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
