import * as React from 'react'
const browser = typeof window !== 'undefined'

const nullServerComponent = () => (<span />)

// ACTIVITIES
export const Activity = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><polyline points='22 12 18 12 15 21 9 3 6 12 2 12'></polyline></svg>
)

// BELL
export const Bell = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
)

// User
export const User = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
)
// Settings
export const Settings = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
)
// Power
export const Power = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
)
// Preferites
export const Preferites = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
)

// MENU
export const Menu = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
)

// CARD
export const Card = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={width} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
)

// LEFT
export const Left = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={width} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clipboard"><line x1="20" y1="12" x2="4" y2="12"></line><polyline points="10 18 4 12 10 6"></polyline></svg>
)

// RIGHT
export const Right = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={width} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clipboard"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
)

// KANBAN
export const Kanban = !browser ? nullServerComponent : ({width = 24, height = 24, color1 = '#333', color2 = '#333', color3 = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" version="1.1" x="0px" y="0px"><title>kanban</title><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g><rect fill={color1} x="2" y="2" width="6" height="20" rx="1"/><rect fill={color2} x="9" y="2" width="6" height="12" rx="1"/><rect fill={color3} x="16" y="2" width="6" height="16" rx="1"/></g></g></svg>
)

// TEXT
export const Text = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-align-left"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
)

// MESSAGE
export const Message = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
    <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
)

// CROSS
export const Cross = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333', stroke = 2}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)

// USERS
export const Users = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
)

// CHECK
export const Check = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><polyline points="20 6 9 17 4 12"></polyline></svg>
)

// SHIELD
export const Shield = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10z"></path></svg>
)

// PLUS
export const Plus = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
)

// MORE
export const More = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" color={color} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
)

export const Icon = !browser ? nullServerComponent : ({width = 24, height = 24, color = '#333', Svg}) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' color={color} fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-activity'><Svg /></svg>
)