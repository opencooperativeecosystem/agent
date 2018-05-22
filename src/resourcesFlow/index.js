import React from 'react'
import List from '../list'
import style from './canvas.css'
const Canvas = (props) => {
  return (
    // <div className={style.board}>
      <div className={style.board_panels}>
        {props.lists.map((list, i) => (
          <List
            cards={list.cards}
            outputs={list.outputs}
            id={list.id}
            status={list.status}
            key={i}
            info={list}
            agents={list.agents}
            name={list.title}
            removeCardFromList={props.removeCardFromList}
            addCardToList={props.addCardToList}
            moveCard={props.moveCard}
            swipeCard={props.swipeCard}
            openModal={props.openModal}
            addNewTask={props.addNewTask}
          />
        ))}
      </div>
    // </div>
  )
}

export default Canvas
