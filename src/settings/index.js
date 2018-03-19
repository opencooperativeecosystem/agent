import React from 'react'
import style from './style.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ToggleButton from 'react-toggle-button'

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
        <Tabs selectedTabClassName={style.list_active}>
          <TabList className={style.scope_list}>
              <Tab>Account</Tab>
              <Tab>Notification</Tab>
          </TabList>
          <TabPanel>
        <section className={style.settings_container}>
          <h3 className={style.container_title}>General Settings</h3>
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
                <img src={data.image} />
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
          </section>
          </TabPanel>
          <TabPanel>
          <section className={style.settings_container + ' ' + style.container_notification }>
            <h3 className={style.container_title}>Notification Settings</h3>
            <div className={style.container_form}>
              {notifications.map((notification, i) => (
                <div key={i} className={style.form_item}>
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
          </section>
          </TabPanel>
        </Tabs>
      </div>
  )
}


export default Settings
