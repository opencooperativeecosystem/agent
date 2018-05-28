import React from 'react'
import style from './style.css'
import ToggleButton from 'react-toggle-button'
// import Panel from '../components/panel'
// import {User, Bell} from '../icons'
import {Icons, Panel} from 'oce-components/build'

const Settings = ({allNotification, toggleNotification, data, saveSettings, updateImage, updateBio, updateEmail, updateLocation, updateName}) => {
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
      <Panel icon={<Icons.User width='18' color='#f0f0f0' />} title='General'>
        <div className={style.container_form}>
          <div className={style.form_item}>
            <h5>Name</h5>
            <input onChange={updateName} placeholder={data.name} />
          </div>
          <div className={style.form_item}>
            <h5>Email</h5>
            <input onChange={updateEmail} placeholder={data.email} />
          </div>
          <div className={style.form_item}>
            <h5>Photo</h5>
            <input onChange={updateImage} placeholder={data.image} />
            <div className={style.item_photo}>
              <img alt='agent' src={data.image} />
            </div>
          </div>
          <div className={style.form_item}>
            <h5>Bio</h5>
            <textarea onChange={updateBio} placeholder={data.note} />
          </div>
          <div className={style.form_actions}>
            <button onClick={saveSettings} >Save</button>
          </div>
        </div>
      </Panel>
      <Panel icon={<Icons.Bell width='18' color='#f0f0f0' />} title='Notification'>
        <div className={style.container_form}>
          {notifications.map((notification, i) => (
            <div key={i} className={style.form_item + ' ' + style.form_setting}>
              <div className={style.item_info}>
                <h5>{notification.display}</h5>
                <p>{notification.description}</p>
              </div>
              <div className={style.item_status}>
              <ToggleButton
                value={ notification.value || false }
                onToggle={(value) => toggleNotification(notification.id, value, notification.originalId)} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}


export default Settings
