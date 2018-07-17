import React from 'react'
import style from './style.css'
import {Icons, Panel} from 'oce-components/build'
import Menu from './menu'
import General from './general'
import Notifications from './notifications';

const Settings = ({active, id, image, note, email, name, updateNotification, mutateNotification, mutateSettings, toggleActivePanel, allNotification, toggleNotification, data}) => {
  const notifications = allNotification.map(notification => {
    let value
    let id
    let updatedValue = data.agentNotificationSettings.filter(notif => notif.notificationType.id === notification.id)
    if (updatedValue.length > 0) { 
      value = updatedValue[0].send
      id = updatedValue[0].id
    }
    return {
      display: notification.display,
      description: notification.description,
      value: value,
      id: id,
      originalId: notification.id
    }
  })
  return (
    <div className={style.settings}>
      <Panel large icon={<Icons.Settings width='18' color='#f0f0f0' />} title='Settings'>
        <Menu active={active} toggleActivePanel={toggleActivePanel} />
        <div className={style.container_form}>
          {active === 'general' ?
            <General id={id} image={image} note={note} name={name} email={email} mutateSettings={mutateSettings} />
            : active === 'notification' ?
            <Notifications updateNotification={updateNotification} mutateNotification={mutateNotification} toggleNotification={toggleNotification} notifications={notifications} />
            : active === 'skills' ?
            <div>
              <h2>Skills</h2>
            </div>
            : active === 'recipes' ?
            <div>
              <h2>Recipes</h2>
            </div>
            : active === 'credentials' ?
            <div>
              <h2>Credentials</h2>
            </div>
            : null
          }
        </div>
      </Panel>
    </div>
  )
}


export default Settings
